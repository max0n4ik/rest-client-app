import Header from '@/shared/Header/Header';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import Footer from '@/shared/Footer/Footer';

const NotFound = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div
        className="relative flex max-w-screen flex-1 items-center justify-center overflow-x-hidden overflow-y-hidden"
        style={{
          background: `linear-gradient(to bottom, #A8D0E6 0%, rgba(0,0,0,0) 60%), url('/not-found-mountains.jpg') center/cover no-repeat`,
          backgroundColor: '#A8D0E6',
        }}>
        <div className="flex w-full max-w-xl flex-col items-center justify-center px-4">
          <h1 className="wrap m-0 mb-4 w-full text-center text-4xl font-bold">{t('notFound.title')}</h1>
          <p className="wrap m-0 mb-6 w-full p-4 text-center text-xl font-medium">{t('notFound.text')}</p>
          <Button
            className="bg-secondary hover:bg-primary w-full cursor-pointer rounded px-6 py-2 font-semibold text-white shadow"
            onClick={() => navigate('/')}>
            {t('notFound.button')}
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default NotFound;
