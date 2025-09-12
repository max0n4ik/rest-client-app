import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t py-3">
      <div className="dark:prose-invert prose prose-sm flex w-full flex-col items-center justify-center text-center">
        <span className="primary-dark text-sm">
          {t('footer.text')}
          <a
            href="https://rs.school/courses/reactjs"
            className="hover:text-secondary-foreground ml-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer">
            {t('footer.link')}
          </a>
        </span>
        <span className="text-primary-dark mt-1 text-sm">{t('footer.copyright')}</span>
      </div>
    </footer>
  );
};

export default Footer;
