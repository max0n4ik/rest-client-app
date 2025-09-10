import 'i18next';

import homeEN from '../src/i18n/locales/en/home.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'home';
    resources: {
      home: typeof homeEN;
    };
  }
}
