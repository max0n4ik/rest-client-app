import React from 'react';
import { useTranslation } from 'react-i18next';
const Footer: React.FC = () => {
  const { t } = useTranslation('footer');
  return (
    <footer className="w-full border-t py-3">
      {' '}
      <div className="dark:prose-invert prose prose-sm flex w-full flex-col items-center justify-center text-center">
        {' '}
        <span className="primary-dark text-sm">
          {' '}
          {t('text')}{' '}
          <a
            href="https://github.com/Darkonic10"
            className="hover:text-accent ml-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer">
            {' '}
            {t('dmitriy')}{' '}
          </a>{' '}
          ,{' '}
          <a
            href="https://github.com/asyadanilova"
            className="hover:text-accent ml-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer">
            {' '}
            {t('asya')}{' '}
          </a>{' '}
          ,{' '}
          <a
            href="https://github.com/max0n4ik"
            className="hover:text-accent ml-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer">
            {' '}
            {t('maxim')}{' '}
          </a>{' '}
          {t('terms')}{' '}
          <a
            href="https://rs.school/courses/reactjs"
            className="hover:text-accent ml-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer">
            {' '}
            {t('link')}{' '}
          </a>{' '}
        </span>{' '}
        <span className="text-primary-dark mt-1 text-sm">{t('copyright')}</span>{' '}
      </div>{' '}
    </footer>
  );
};
export default Footer;
