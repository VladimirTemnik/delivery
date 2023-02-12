import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";

export type MessageSchema = typeof en | typeof it;

export default createI18n<[MessageSchema], "en">({
  legacy: false,
  locale: process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages: { en },
});
