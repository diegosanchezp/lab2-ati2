import i18n from 'i18next';
import enTranslation from './en/translation.json';
import esTranslation from './es/translation.json';

import { initReactI18next } from 'react-i18next';

export const resources = {
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources: {
    en: {
      translation: {
        ...enTranslation,
      }
    },
    es:{
      translation: {
        ...esTranslation,
      }
    },
  },
});
