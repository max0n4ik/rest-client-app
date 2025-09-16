import 'i18next';

import homeEN from '../src/i18n/locales/en/home.json';
import footerEN from '../src/i18n/locales/en/Footer.json';
import headerEN from '../src/i18n/locales/en/Header.json';
import notFoundEN from '../src/i18n/locales/en/NotFound.json';
import restClientEN from '../src/i18n/locales/en/RestClient.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'home';
    resources: {
      home: typeof homeEN;
      footer: typeof footerEN;
      header: typeof headerEN;
      notFound: typeof notFoundEN;
      restClient: typeof restClientEN;
    };
  }
}
