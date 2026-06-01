import { autoTranslatePost } from '../../services/auto-translate';

declare const strapi: any;

export default {
  async afterCreate(event: any) {
    await autoTranslatePost(strapi, event.result);
  },

  async afterUpdate(event: any) {
    await autoTranslatePost(strapi, event.result);
  },
};
