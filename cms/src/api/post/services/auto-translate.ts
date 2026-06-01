type Locale = 'en' | 'pt' | 'es';

type PostDocument = {
  documentId?: string;
  locale?: Locale;
  publishedAt?: string | null;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: unknown;
  seoTitle?: string;
  seoDescription?: string;
  translationEditedManually?: boolean;
  overwriteTranslations?: boolean;
};

const locales: Locale[] = ['en', 'pt', 'es'];
const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Portuguese',
  es: 'Spanish',
};

const deeplTargets: Record<Locale, string> = {
  en: 'EN-US',
  pt: 'PT-PT',
  es: 'ES',
};

const processing = new Set<string>();

function envFlag(name: string, fallback: boolean) {
  const value = process.env[name];
  return value === undefined ? fallback : value === 'true';
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function isTextNode(value: unknown): value is { text: string } {
  return Boolean(value && typeof value === 'object' && typeof (value as { text?: unknown }).text === 'string');
}

async function translateText(strapi: any, text: string | undefined, sourceLocale: Locale, targetLocale: Locale) {
  if (!text) {
    return text;
  }

  const provider = (process.env.TRANSLATION_PROVIDER || 'openai').toLowerCase();

  if (provider === 'deepl') {
    return translateWithDeepL(strapi, text, targetLocale);
  }

  if (provider === 'openai' || provider === 'llm') {
    return translateWithOpenAI(strapi, text, sourceLocale, targetLocale);
  }

  strapi.log.warn(`Unsupported TRANSLATION_PROVIDER "${provider}". Keeping source text.`);
  return text;
}

async function translateWithDeepL(strapi: any, text: string, targetLocale: Locale) {
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    strapi.log.warn('DEEPL_API_KEY is missing. Keeping source text.');
    return text;
  }

  const response = await fetch(process.env.DEEPL_API_URL || 'https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      text,
      target_lang: deeplTargets[targetLocale],
    }),
  });

  if (!response.ok) {
    strapi.log.error(`DeepL translation failed: ${response.status} ${response.statusText}`);
    return text;
  }

  const json = (await response.json()) as { translations?: Array<{ text?: string }> };
  return json.translations?.[0]?.text || text;
}

async function translateWithOpenAI(strapi: any, text: string, sourceLocale: Locale, targetLocale: Locale) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.LLM_TRANSLATOR_LLM_API_KEY;
  if (!apiKey) {
    strapi.log.warn('OPENAI_API_KEY or LLM_TRANSLATOR_LLM_API_KEY is missing. Keeping source text.');
    return text;
  }

  const baseUrl =
    process.env.OPENAI_BASE_URL || process.env.STRAPI_ADMIN_LLM_TRANSLATOR_LLM_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.OPENAI_MODEL || process.env.STRAPI_ADMIN_LLM_TRANSLATOR_LLM_MODEL || 'gpt-4o-mini';

  const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content:
            'You are a professional relocation-sector translator. Return only the translated text and preserve meaning, tone, formatting, and proper nouns.',
        },
        {
          role: 'user',
          content: `Translate from ${localeNames[sourceLocale]} to ${localeNames[targetLocale]}:\n\n${text}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    strapi.log.error(`OpenAI-compatible translation failed: ${response.status} ${response.statusText}`);
    return text;
  }

  const json = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return json.choices?.[0]?.message?.content?.trim() || text;
}

async function translateRichContent(strapi: any, content: unknown, sourceLocale: Locale, targetLocale: Locale): Promise<unknown> {
  if (typeof content === 'string') {
    return translateText(strapi, content, sourceLocale, targetLocale);
  }

  if (Array.isArray(content)) {
    return Promise.all(content.map((item) => translateRichContent(strapi, item, sourceLocale, targetLocale)));
  }

  if (content && typeof content === 'object') {
    const translated: Record<string, unknown> = { ...(content as Record<string, unknown>) };

    if (isTextNode(translated)) {
      translated.text = await translateText(strapi, translated.text, sourceLocale, targetLocale);
    }

    if (Array.isArray(translated.children)) {
      translated.children = await Promise.all(
        translated.children.map((item) => translateRichContent(strapi, item, sourceLocale, targetLocale)),
      );
    }

    return translated;
  }

  return content;
}

async function buildTranslatedPostData(strapi: any, source: PostDocument, sourceLocale: Locale, targetLocale: Locale) {
  const translatedTitle = await translateText(strapi, source.title, sourceLocale, targetLocale);
  const translatedSlug = slugify((await translateText(strapi, source.slug || source.title, sourceLocale, targetLocale)) || '');

  return {
    title: translatedTitle,
    slug: translatedSlug,
    excerpt: await translateText(strapi, source.excerpt, sourceLocale, targetLocale),
    content: await translateRichContent(strapi, source.content, sourceLocale, targetLocale),
    seoTitle: await translateText(strapi, source.seoTitle || source.title, sourceLocale, targetLocale),
    seoDescription: await translateText(strapi, source.seoDescription || source.excerpt, sourceLocale, targetLocale),
    sourceLocale,
    translationGroupId: source.documentId,
    translationEditedManually: false,
  };
}

async function findLocalizedDraft(strapi: any, documentId: string, locale: Locale) {
  try {
    return await strapi.documents('api::post.post').findOne({
      documentId,
      locale,
      status: 'draft',
    });
  } catch {
    return null;
  }
}

export async function autoTranslatePost(strapi: any, source: PostDocument) {
  if (!envFlag('AUTO_TRANSLATE_ON_PUBLISH', false) || !source.publishedAt || !source.documentId) {
    return;
  }

  const sourceLocale = source.locale || 'en';
  const processingKey = `${source.documentId}:${sourceLocale}`;

  if (processing.has(processingKey)) {
    return;
  }

  processing.add(processingKey);

  try {
    for (const targetLocale of locales.filter((locale) => locale !== sourceLocale)) {
      const existing = await findLocalizedDraft(strapi, source.documentId, targetLocale);

      if (existing?.translationEditedManually && !source.overwriteTranslations) {
        strapi.log.info(`Skipping ${targetLocale} translation for ${source.documentId}: manually edited.`);
        continue;
      }

      const data = await buildTranslatedPostData(strapi, source, sourceLocale, targetLocale);

      await strapi.documents('api::post.post').update({
        documentId: source.documentId,
        locale: targetLocale,
        data,
      });

      if (!envFlag('TRANSLATION_CREATE_AS_DRAFT', true)) {
        await strapi.documents('api::post.post').publish({
          documentId: source.documentId,
          locale: targetLocale,
        });
      }
    }
  } catch (error) {
    strapi.log.error('Post auto-translation failed', error);
  } finally {
    processing.delete(processingKey);
  }
}
