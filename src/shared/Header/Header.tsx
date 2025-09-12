import type { JSX } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';
import { ModeDarkIcon } from 'tdesign-icons-react';

const Header = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <header className="flex h-15 w-full items-center justify-center">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="mr-3 ml-10 h-10 w-15" />
        <h1 className="text-2xl font-bold">{t('header.title')}</h1>
      </div>
      <nav className="ml-auto space-x-4 text-2xl font-semibold tracking-tight uppercase first:mt-0">
        <a href="/login" className="hover:text-secondary-foreground">
          {t('header.login')}
        </a>
        <a href="/signup" className="hover:text-secondary-foreground">
          {t('header.signup')}
        </a>
      </nav>
      <div className="mr-15 ml-auto flex items-center gap-2">
        <button className="hover:text-secondary-foreground flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-white bg-white hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 -5 34 34"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
            />
          </svg>
        </button>
        <button className="hover:text-secondary-foreground flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-white bg-white hover:bg-gray-200">
          <ModeDarkIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
