import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import homeEN from '../src/i18n/locales/en/home.json';
import homeRU from '../src/i18n/locales/ru/home.json';

i18n.use(initReactI18next).init({
  defaultNS: 'home',
  fallbackLng: 'en',
  lng: 'en',
  ns: ['home'],
  backend: {
    loadPath: '../public/i18n/locales/{{lng}}/{{ns}}.json',
  },
  resources: {
    en: {
      home: homeEN,
    },
    ru: {
      home: homeRU,
    },
  },
});

export default i18n;
