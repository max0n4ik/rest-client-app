import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import homeEN from '../src/i18n/locales/en/home.json';
import homeRU from '../src/i18n/locales/ru/home.json';
import footerEN from '../src/i18n/locales/en/Footer.json';
import footerRU from '../src/i18n/locales/ru/Footer.json';
import headerEN from '../src/i18n/locales/en/Header.json';
import headerRU from '../src/i18n/locales/ru/Header.json';
import notFoundEN from '../src/i18n/locales/en/NotFound.json';
import notFoundRU from '../src/i18n/locales/ru/NotFound.json';
import restClientEN from '../src/i18n/locales/en/RestClient.json';
import restClientRU from '../src/i18n/locales/ru/RestClient.json';
import registrationEN from '../src/i18n/locales/en/Registration.json';
import registrationRU from '../src/i18n/locales/ru/Registration.json';
import zodValidationEN from '../src/i18n/locales/en/ZodValidation.json';
import zodValidationRU from '../src/i18n/locales/ru/ZodValidation.json';
import loginEN from '../src/i18n/locales/en/Login.json';
import loginRU from '../src/i18n/locales/ru/Login.json';
import historyEN from '../src/i18n/locales/en/History.json';
import historyRU from '../src/i18n/locales/ru/History.json';

const resources = {
  en: {
    home: homeEN,
    footer: footerEN,
    header: headerEN,
    notFound: notFoundEN,
    restClient: restClientEN,
    registration: registrationEN,
    zodValidation: zodValidationEN,
    login: loginEN,
    history: historyEN,
  },
  ru: {
    home: homeRU,
    footer: footerRU,
    header: headerRU,
    notFound: notFoundRU,
    restClient: restClientRU,
    registration: registrationRU,
    zodValidation: zodValidationRU,
    login: loginRU,
    history: historyRU,
  },
};
i18n.use(initReactI18next).init({
  defaultNS: 'home',
  fallbackLng: 'en',
  lng: 'en',
  ns: ['home', 'footer', 'header', 'notFound', 'restClient', 'registration', 'zodValidation', 'login', 'history'],
  resources,
});
export default i18n;
