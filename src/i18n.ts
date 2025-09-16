import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import homeEN from '../src/i18n/locales/en/home.json';
import homeRU from '../src/i18n/locales/ru/home.json';
import footerEN from '../src/i18n/locales/en/Footer.json';
import footerRU from '../src/i18n/locales/ru/Footer.json';
import headerEN from '../src/i18n/locales/en/Header.json';
import headerRU from '../src/i18n/locales/ru/Header.json';
import NotFoundEN from '../src/i18n/locales/en/NotFound.json';
import NotFoundRU from '../src/i18n/locales/ru/NotFound.json';
import restClientEN from '../src/i18n/locales/en/RestClient.json';
import restClientRU from '../src/i18n/locales/ru/RestClient.json';

i18n.use(initReactI18next).init({
  defaultNS: 'home',
  fallbackLng: 'en',
  lng: 'en',
  ns: ['home', 'footer', 'header', 'notFound', 'restClient'],
  backend: {
    loadPath: '../public/i18n/locales/{{lng}}/{{ns}}.json',
  },
  resources: {
    en: {
      home: homeEN,
      footer: footerEN,
      header: headerEN,
      notFound: NotFoundEN,
      restClient: restClientEN,
    },
    ru: {
      home: homeRU,
      footer: footerRU,
      header: headerRU,
      notFound: NotFoundRU,
      restClient: restClientRU,
    },
  },
});

export default i18n;
