import type { JSX } from 'react/jsx-runtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useAuthStore } from '@/store/AuthState';

const Header = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const login = useAuthStore((state) => state.user);
  const changeLanguageHandler = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };
  return (
    <header className="flex h-14 min-h-14 w-full items-center justify-center">
      <div className="flex items-center">
        <img src="images/logo.png" alt="Logo" style={{ width: '60px' }} className="mr-3 ml-10 h-10 w-15" />
        <h1 className="text-2xl font-bold">{t('header.title')}</h1>
      </div>
      <nav className="ml-auto space-x-4 text-2xl font-semibold tracking-tight uppercase first:mt-0">
        {login ? (
          <>
            <Link to="/history" className="hover:text-secondary-foreground">
              History
            </Link>
            <Link to="/rest-client" className="hover:text-secondary-foreground">
              REST Client
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-secondary-foreground">
              {t('header.login')}
            </Link>
            <Link to="/registration" className="hover:text-secondary-foreground">
              {t('header.signup')}
            </Link>
          </>
        )}
      </nav>
      <div className="mr-15 ml-auto flex items-center gap-2">
        <button
          onClick={changeLanguageHandler}
          className="hover:text-secondary-foreground flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-white bg-white hover:bg-gray-200">
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
