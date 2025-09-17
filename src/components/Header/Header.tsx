import type { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faBars, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useAuthStore } from '@/store/AuthState';

const Header = (): JSX.Element => {
  const { t, i18n } = useTranslation('header');
  const login = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguageHandler = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex h-14 min-h-14 w-full items-center justify-between transition-colors duration-300 md:justify-center ${
          scrolled ? 'bg-secondary text-white shadow-lg' : 'bg-background text-foreground'
        }`}>
        <div className="flex items-center">
          <img src="images/logo.png" alt="Logo" style={{ width: '60px' }} className="mr-3 ml-10 h-10 w-15" />
          <Link replace to="/">
            <h1 className="text-2xl font-bold">{t('title')}</h1>
          </Link>
        </div>
        <nav className="ml-auto hidden space-x-4 text-2xl font-semibold tracking-tight uppercase first:mt-0 md:flex">
          {login ? (
            <>
              <Link to="/history" className="hover:text-accent transition-colors duration-300">
                {t('history')}
              </Link>
              <Link to="/rest-client" className="hover:text-accent transition-colors duration-300">
                {t('restClient')}
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent transition-colors duration-300">
                {t('login')}
              </Link>
              <Link to="/registration" className="hover:text-accent transition-colors duration-300">
                {t('signup')}
              </Link>
            </>
          )}
        </nav>
        <div className="mr-15 ml-15 flex items-center gap-2 md:ml-auto">
          <button
            onClick={changeLanguageHandler}
            className="hover:text-accent flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-white hover:bg-gray-200">
            <FontAwesomeIcon icon={faLanguage} />
          </button>
          {login && (
            <button
              onClick={logout}
              className="hover:text-accent flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-white hover:bg-gray-200"
              aria-label="Logout">
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </button>
          )}
          <button
            className="hover:text-accent flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-white hover:bg-gray-200 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu">
            <span className={`inline-block transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}>
              <FontAwesomeIcon icon={faBars} />
            </span>
          </button>
        </div>
      </header>
      {menuOpen && (
        <div
          className={`${
            scrolled ? 'bg-secondary text-white shadow-lg' : 'bg-background text-foreground'
          } sticky top-14 z-50 block w-full text-xl font-semibold`}>
          <nav className="flex flex-col items-center gap-2 py-4 uppercase">
            {login ? (
              <>
                <Link
                  to="/history"
                  className="hover:text-accent transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}>
                  {t('history')}
                </Link>
                <Link
                  to="/rest-client"
                  className="hover:text-accent transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}>
                  {t('restClient')}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-accent transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}>
                  {t('login')}
                </Link>
                <Link
                  to="/registration"
                  className="hover:text-accent transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}>
                  {t('signup')}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
