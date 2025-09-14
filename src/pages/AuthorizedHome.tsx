import UserCard from '@/shared/UserCard/UserCard';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

const AuthorizedHome = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="relative mx-auto h-screen max-w-screen overflow-x-hidden overflow-y-hidden"
        style={{
          background: `linear-gradient(to bottom, #A8D0E6 0%, rgba(0,0,0,0) 60%), url('images/main-page-mountains.jpg') center/cover no-repeat`,
          backgroundColor: '#A8D0E6',
        }}>
        <div className="flex h-full w-full flex-col items-center justify-center px-4 sm:block">
          <h1 className="wrap m-0 w-full text-center text-4xl font-bold sm:absolute sm:top-18 sm:left-18 sm:w-1/2 sm:text-left">
            {t('homeAuthorized.welcomeTitle')}
          </h1>
          <p className="wrap m-0 w-full p-4 text-center text-xl font-medium sm:absolute sm:right-40 sm:bottom-140 sm:w-1/2 sm:text-left">
            {t('homeAuthorized.welcomeText')}
          </p>
        </div>
      </div>
      <div className="relative mx-auto h-screen max-w-screen overflow-x-hidden overflow-y-hidden">
        <div
          className="inset-0 -z-10"
          style={{
            background: `linear-gradient(to bottom, #A8D0E6 0%, rgba(0, 0, 0, 0.32) 60%), url('images/main-page-mountains.jpg') center/cover no-repeat`,
            backgroundColor: '#A8D0E6',
            transform: 'scaleY(-1)',
            width: '100vw',
            height: '100vh',
          }}
        />
        <h1 className="wrap text-background absolute top-12 left-1/2 m-0 w-1/2 -translate-x-1/2 text-center text-4xl font-bold">
          {t('homeAuthorized.projectContributors')}
        </h1>
        <ul className="wrap absolute top-70 left-1/2 flex w-full max-w-screen-xl -translate-x-1/2 flex-col items-center gap-x-0 gap-y-8 text-left text-xl font-medium sm:grid sm:grid-cols-3 sm:items-stretch sm:gap-x-12 sm:gap-y-12">
          <UserCard
            photo="images/asya.jpg"
            name={String(t('homeAuthorized.contributor1'))}
            description={String(t('homeAuthorized.contribution1'))}
          />
          <UserCard
            photo="images/maxim.png"
            name={String(t('homeAuthorized.contributor2'))}
            description={String(t('homeAuthorized.contribution2'))}
          />
          <UserCard
            photo="images/dmitriy.jpg"
            name={String(t('homeAuthorized.contributor3'))}
            description={String(t('homeAuthorized.contribution3'))}
          />
        </ul>
      </div>
    </>
  );
};
export default AuthorizedHome;
