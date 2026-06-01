# Alttavia Relocation Site

Site institucional em Next.js App Router, TypeScript e Tailwind CSS, com CMS headless separado em Strapi 5.

## O que mudou

Payload CMS foi removido do frontend. Foram removidos `src/payload.config.ts`, `src/payload-types.ts`, `src/lib/payload.ts`, `src/lib/cms.ts`, `src/cms/`, `src/app/(payload)/`, o banco local `payload.db`, uploads locais em `media/`, scripts Payload e dependências `payload`, `@payloadcms/*`, `graphql`, `dotenv` e `sharp`.

Não havia docker-compose, migrations externas ou configuração clara de banco remoto. Nenhum banco remoto foi apagado.

## Estrutura

- Frontend Next.js: raiz do projeto
- CMS Strapi: `cms/`
- Blog e páginas: consumidos via REST do Strapi por `src/lib/strapi.ts`
- Locales públicos: `en`, `pt`, `es`
- Locale padrão: `en`

## Instalação

```bash
npm install
npm --prefix cms install
```

## Variáveis do frontend

Copie `.env.example` para `.env.local` se necessário:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
```

Use `STRAPI_API_TOKEN` apenas no server-side. Não use `NEXT_PUBLIC_` para tokens privados.

## Variáveis do Strapi

Copie `cms/.env.example` para `cms/.env` e troque todos os secrets antes de produção.

Principais variáveis:

```bash
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
CORS_ORIGIN=http://localhost:3000
STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE=en
AUTO_TRANSLATE_ON_PUBLISH=false
TRANSLATION_CREATE_AS_DRAFT=true
TRANSLATION_PROVIDER=openai
OPENAI_API_KEY=
DEEPL_API_KEY=
LLM_TRANSLATOR_LLM_API_KEY=
STRAPI_ADMIN_LLM_TRANSLATOR_LLM_BASE_URL=https://api.openai.com/v1
STRAPI_ADMIN_LLM_TRANSLATOR_LLM_MODEL=gpt-4o-mini
```

## Rodar localmente

Frontend:

```bash
npm run dev:web
```

CMS:

```bash
npm run dev:cms
```

URLs:

- Site: `http://localhost:3000/en`
- Admin Strapi: `http://localhost:1337/admin`

Na primeira abertura do admin, crie o usuário manualmente. Sugestão local: `admin@example.com` / `ChangeMe123!`. Troque em produção.

## Conteúdo no Strapi

Content types criados:

- `Post`: localizado, Draft & Publish, campos `title`, `slug`, `excerpt`, `content`, `coverImage`, `seoTitle`, `seoDescription`, `authorName`, `translationGroupId`, `sourceLocale`, `translationEditedManually`, `overwriteTranslations`
- `Page`: localizado, Draft & Publish, campos `pageKey`, `title`, `heroTitle`, `heroSubtitle`, `body`, `sections`, `seoTitle`, `seoDescription`
- `Media`: Media Library nativa do Strapi

O bootstrap garante os locales `en`, `pt` e `es`, define `en` como padrão e libera leitura pública para posts e páginas publicados.

Para popular conteúdo base em desenvolvimento:

```bash
npm run seed:cms
```

O seed roda no bootstrap do Strapi com `STRAPI_BOOTSTRAP_SEED=true`; encerre o processo depois que aparecer `Development seed completed`.

## Blog

Rotas disponíveis:

- `/en/blog` e `/en/blog/[slug]`
- `/pt/blog` e `/pt/blog/[slug]`
- `/es/blog` e `/es/blog/[slug]`

O frontend busca apenas conteúdo publicado, filtrado por locale. Posts inexistentes ou não publicados retornam 404.

## Tradução automática

Plugin escolhido: `strapi-llm-translator`.

Motivo: `strapi-plugin-translate` atual declara compatibilidade com Strapi 4, enquanto o projeto usa Strapi 5. `strapi-llm-translator` declara suporte a Strapi `>=5.12.3` e funciona com APIs OpenAI-compatible. O Strapi 5 também já possui i18n nativo.

Fluxo manual:

1. Configure `LLM_TRANSLATOR_LLM_API_KEY`, base URL e modelo. Se preferir, use `OPENAI_API_KEY`; `cms/config/plugins.ts` mapeia essa variável para o plugin quando `LLM_TRANSLATOR_LLM_API_KEY` está vazia.
2. Rebuild do admin: `npm run build:cms`.
3. Use o painel do plugin no Strapi para preencher traduções.

Fluxo automático:

1. Configure `AUTO_TRANSLATE_ON_PUBLISH=true`.
2. Configure `TRANSLATION_PROVIDER=openai` com `OPENAI_API_KEY` ou `TRANSLATION_PROVIDER=deepl` com `DEEPL_API_KEY`.
3. Publique um post no idioma principal.
4. O lifecycle cria/atualiza `en`, `pt` e `es`, pulando o locale de origem.
5. Traduções são draft por padrão (`TRANSLATION_CREATE_AS_DRAFT=true`).
6. Para publicar automaticamente as traduções, use `TRANSLATION_CREATE_AS_DRAFT=false`.

Se uma tradução tiver `translationEditedManually=true`, o serviço não sobrescreve. Para forçar atualização, marque `overwriteTranslations=true` no post de origem.

Erros de tradução são logados e não bloqueiam o publish. Sem chave de API, o serviço mantém o texto original e registra aviso.

## Adicionar idioma

1. Adicione o locale no Strapi em Settings -> Internationalization.
2. Atualize `src/i18n/routing.ts`.
3. Adicione dicionário em `src/i18n/dictionaries.ts`.
4. Inclua o novo idioma no serviço `cms/src/api/post/services/auto-translate.ts`.
5. Crie ou traduza conteúdos no Strapi.

## Build e validação

```bash
npm run test
npm run lint
npm run typecheck
npm run build:web
npm run build:cms
```

## Segurança

Troque todos os secrets do Strapi, senhas, API tokens e chaves de tradução em produção. Não commite `.env`, tokens privados ou bancos locais.

## Problemas conhecidos

- O seed de admin não foi automatizado para evitar hack inseguro em tabelas internas do Strapi Admin.
- O seletor global de idioma preserva páginas equivalentes; em posts, sem mapa client-side de slug traduzido, ele volta para `/{locale}/blog`. A página do post mostra links para slugs traduzidos quando o Strapi retorna `localizations`.
- O Strapi reporta vulnerabilidades transitivas via `npm audit`; revisar antes de produção conforme política do projeto.
