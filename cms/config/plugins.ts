import type { Core } from '@strapi/strapi';

function setPluginEnvFallback(pluginKey: string, fallbackKey: string) {
  if (!process.env[pluginKey] && process.env[fallbackKey]) {
    process.env[pluginKey] = process.env[fallbackKey];
  }
}

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  setPluginEnvFallback('LLM_TRANSLATOR_LLM_API_KEY', 'OPENAI_API_KEY');
  setPluginEnvFallback('STRAPI_ADMIN_LLM_TRANSLATOR_LLM_BASE_URL', 'OPENAI_BASE_URL');
  setPluginEnvFallback('STRAPI_ADMIN_LLM_TRANSLATOR_LLM_MODEL', 'OPENAI_MODEL');

  return {
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET'),
      },
    },
    'strapi-llm-translator': {
      enabled: true,
    },
  };
};

export default config;
