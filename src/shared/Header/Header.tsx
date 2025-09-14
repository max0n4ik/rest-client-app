import type { JSX } from 'react/jsx-runtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

// Path to the logo image. Ensure the asset exists in the public directory at this path.
const LOGO_PATH = '/logo.png';

const Header = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <header className="flex h-14 min-h-14 w-full items-center justify-center">
      <div className="flex items-center">
        <img src={LOGO_PATH} alt="Logo" className="mr-3 ml-10 h-10 w-15" />
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
          <FontAwesomeIcon icon={faLanguage} />
        </button>
        <button className="hover:text-secondary-foreground flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-white bg-white hover:bg-gray-200">
          <FontAwesomeIcon icon={faMoon} />
        </button>
      </div>
    </header>
  );
};

export default Header;
