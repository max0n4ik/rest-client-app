import 'i18next';

import homeEN from '../src/i18n/locales/en/home.json';
import footerEN from '../src/i18n/locales/en/Footer.json';
import headerEN from '../src/i18n/locales/en/Header.json';
import notFoundEN from '../src/i18n/locales/en/NotFound.json';
import restClientEN from '../src/i18n/locales/en/RestClient.json';
import registrationEN from '../src/i18n/locales/en/Registration.json';
import zodValidationEN from '../src/i18n/locales/en/ZodValidation.json';
import loginEN from '../src/i18n/locales/en/Login.json';
import historyEN from '../src/i18n/locales/en/History.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'home';
    resources: {
      home: typeof homeEN;
      footer: typeof footerEN;
      header: typeof headerEN;
      notFound: typeof notFoundEN;
      restClient: typeof restClientEN;
      registration: typeof registrationEN;
      zodValidation: typeof zodValidationEN;
      login: typeof loginEN;
      history: typeof historyEN;
    };
  }
}
