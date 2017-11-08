import i18n from 'i18next';

import XHR from 'i18next-xhr-backend';

import LanguageDetector from 'i18next-browser-languagedetector';

import { reactI18nextModule } from 'react-i18next';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'fr',
    preload: ['en', 'fr'],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  });

i18n.languages = ['fr', 'en'];

export default i18n;
