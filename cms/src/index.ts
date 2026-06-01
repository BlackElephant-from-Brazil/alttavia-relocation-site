// import type { Core } from '@strapi/strapi';

type Locale = 'en' | 'pt' | 'es';
type PageKey = 'home' | 'why-us' | 'relocation-services' | 'contact';

const locales: Array<{ code: Locale; name: string }> = [
  { code: 'en', name: 'English (en)' },
  { code: 'pt', name: 'Portuguese (pt)' },
  { code: 'es', name: 'Spanish (es)' },
];

const blocks = (text: string) => [
  {
    type: 'paragraph',
    children: [{ type: 'text', text }],
  },
];

const pages: Record<Locale, Array<{ pageKey: PageKey; title: string; heroTitle: string; heroSubtitle: string }>> = {
  en: [
    {
      pageKey: 'home',
      title: 'Home',
      heroTitle: 'Relocation planning for international families',
      heroSubtitle: 'Alttavia coordinates visas, housing, schools, and arrival details across Europe.',
    },
    {
      pageKey: 'why-us',
      title: 'Why Us',
      heroTitle: 'Senior guidance for complex moves',
      heroSubtitle: 'A calm advisory model for families and professionals who need clear decisions.',
    },
    {
      pageKey: 'relocation-services',
      title: 'Relocation Services',
      heroTitle: 'End-to-end relocation support',
      heroSubtitle: 'From destination strategy to settling in, our team keeps each step organized.',
    },
    {
      pageKey: 'contact',
      title: 'Contact',
      heroTitle: 'Start your relocation plan',
      heroSubtitle: 'Tell us about your timeline, destination, and family profile.',
    },
  ],
  pt: [
    {
      pageKey: 'home',
      title: 'Início',
      heroTitle: 'Planejamento de mudança para famílias internacionais',
      heroSubtitle: 'A Alttavia coordena vistos, moradia, escolas e chegada em destinos europeus.',
    },
    {
      pageKey: 'why-us',
      title: 'Por que nós',
      heroTitle: 'Orientação sênior para mudanças complexas',
      heroSubtitle: 'Um modelo consultivo claro para famílias e profissionais que precisam decidir bem.',
    },
    {
      pageKey: 'relocation-services',
      title: 'Serviços de relocation',
      heroTitle: 'Suporte completo para relocation',
      heroSubtitle: 'Da estratégia de destino à instalação, mantemos cada etapa organizada.',
    },
    {
      pageKey: 'contact',
      title: 'Contato',
      heroTitle: 'Comece seu plano de relocation',
      heroSubtitle: 'Conte-nos seu prazo, destino e perfil familiar.',
    },
  ],
  es: [
    {
      pageKey: 'home',
      title: 'Inicio',
      heroTitle: 'Planificación de relocation para familias internacionales',
      heroSubtitle: 'Alttavia coordina visados, vivienda, colegios y llegada en destinos europeos.',
    },
    {
      pageKey: 'why-us',
      title: 'Por qué nosotros',
      heroTitle: 'Orientación senior para mudanzas complejas',
      heroSubtitle: 'Un modelo consultivo claro para familias y profesionales que necesitan decidir bien.',
    },
    {
      pageKey: 'relocation-services',
      title: 'Servicios de relocation',
      heroTitle: 'Soporte integral para relocation',
      heroSubtitle: 'Desde la estrategia de destino hasta la instalación, mantenemos cada paso organizado.',
    },
    {
      pageKey: 'contact',
      title: 'Contacto',
      heroTitle: 'Comience su plan de relocation',
      heroSubtitle: 'Cuéntenos su calendario, destino y perfil familiar.',
    },
  ],
};

const posts: Record<Locale, { title: string; slug: string; excerpt: string; content: unknown; seoTitle: string; seoDescription: string }> = {
  en: {
    title: 'How to prepare for a relocation to Portugal',
    slug: 'prepare-relocation-portugal',
    excerpt: 'A practical checklist for visas, housing, schools, and arrival planning.',
    content: blocks('Start with documents, confirm your housing strategy, and align school timing before booking travel.'),
    seoTitle: 'How to prepare for a relocation to Portugal',
    seoDescription: 'A practical relocation checklist for families moving to Portugal.',
  },
  pt: {
    title: 'Como se preparar para uma mudança para Portugal',
    slug: 'preparar-mudanca-portugal',
    excerpt: 'Um checklist prático para vistos, moradia, escolas e planejamento de chegada.',
    content: blocks('Comece pelos documentos, confirme a estratégia de moradia e alinhe o calendário escolar antes da viagem.'),
    seoTitle: 'Como se preparar para uma mudança para Portugal',
    seoDescription: 'Um checklist prático de relocation para famílias que se mudam para Portugal.',
  },
  es: {
    title: 'Cómo prepararse para una mudanza a Portugal',
    slug: 'preparar-mudanza-portugal',
    excerpt: 'Una lista práctica para visados, vivienda, colegios y planificación de llegada.',
    content: blocks('Empiece por los documentos, confirme la estrategia de vivienda y alinee el calendario escolar antes de viajar.'),
    seoTitle: 'Cómo prepararse para una mudanza a Portugal',
    seoDescription: 'Una lista práctica de relocation para familias que se mudan a Portugal.',
  },
};

async function ensureLocales(strapi: any) {
  const localeService = strapi.plugin('i18n').service('locales');

  for (const locale of locales) {
    const existing = await localeService.findByCode(locale.code);

    if (!existing) {
      await localeService.create(locale);
    }
  }

  await localeService.setDefaultLocale({ code: 'en' });
}

async function ensurePublicPermissions(strapi: any) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (!publicRole) {
    return;
  }

  for (const action of ['api::post.post.find', 'api::post.post.findOne', 'api::page.page.find', 'api::page.page.findOne']) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: {
        action,
        role: publicRole.id,
      },
    });

    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id,
        },
      });
    }
  }
}

async function upsertLocalizedDocument(strapi: any, uid: string, locale: Locale, filters: Record<string, unknown>, data: Record<string, unknown>) {
  const existing = await strapi.documents(uid).findFirst({
    locale,
    filters,
  });

  if (existing) {
    await strapi.documents(uid).update({
      documentId: existing.documentId,
      locale,
      data,
      status: 'published',
    });
    return existing;
  }

  return strapi.documents(uid).create({
    locale,
    data,
    status: 'published',
  });
}

async function seedPages(strapi: any) {
  for (const locale of locales.map((item) => item.code)) {
    for (const page of pages[locale]) {
      await upsertLocalizedDocument(
        strapi,
        'api::page.page',
        locale,
        { pageKey: { $eq: page.pageKey } },
        {
          ...page,
          sections: blocks(page.heroSubtitle),
          seoTitle: page.title,
          seoDescription: page.heroSubtitle,
        },
      );
    }
  }
}

async function seedPosts(strapi: any) {
  const existing = await strapi.documents('api::post.post').findFirst({
    locale: 'en',
    filters: {
      slug: { $eq: posts.en.slug },
    },
  });

  if (existing) {
    return;
  }

  const source = await strapi.documents('api::post.post').create({
    locale: 'en',
    status: 'published',
    data: {
      ...posts.en,
      authorName: 'Alttavia',
      sourceLocale: 'en',
    },
  });

  for (const locale of ['pt', 'es'] as Locale[]) {
    await strapi.documents('api::post.post').update({
      documentId: source.documentId,
      locale,
      status: 'published',
      data: {
        ...posts[locale],
        authorName: 'Alttavia',
        sourceLocale: 'en',
        translationGroupId: source.documentId,
      },
    });
  }
}

async function seedContent(strapi: any) {
  await seedPages(strapi);
  await seedPosts(strapi);
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    await ensureLocales(strapi);
    await ensurePublicPermissions(strapi);

    if (process.env.STRAPI_BOOTSTRAP_SEED === 'true') {
      await seedContent(strapi);
      strapi.log.info('Development seed completed.');
    }
  },
};
