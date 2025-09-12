import Header from '@/shared/Header/Header';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const NotFound = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div
        className="relative mx-auto flex h-[93.5vh] max-w-screen items-center justify-center overflow-x-hidden overflow-y-hidden"
        style={{
          background: `linear-gradient(to bottom, #A8D0E6 0%, rgba(0,0,0,0) 60%), url('/not-found-mountains.jpg') center/cover no-repeat`,
          backgroundColor: '#A8D0E6',
        }}>
        <div className="flex w-full max-w-xl flex-col items-center justify-center px-4">
          <h1 className="wrap m-0 mb-4 w-full text-center text-4xl font-bold">{t('notFound.title')}</h1>
          <p className="wrap m-0 mb-6 w-full p-4 text-center text-xl font-medium">{t('notFound.text')}</p>
          <button
            className="bg-primary-dark hover:bg-primary rounded px-6 py-2 font-semibold text-white shadow"
            onClick={() => navigate('/')}>
            {t('notFound.button')}
          </button>
        </div>
      </div>
    </>
  );
};
export default NotFound;
