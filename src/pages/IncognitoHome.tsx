import AchievementCard from '@/shared/AchievementCard/AchievementCard';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { ModeDarkIcon, HistoryIcon } from 'tdesign-icons-react';
import { ApiOutlined } from '@ant-design/icons';

const IncognitoHome = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="relative mx-auto h-screen max-w-screen overflow-x-hidden overflow-y-hidden"
        style={{
          background: `linear-gradient(to bottom, #A8D0E6 0%, rgba(0,0,0,0) 60%), url('/main-page-mountains.jpg') center/cover no-repeat`,
          backgroundColor: '#A8D0E6',
        }}>
        <div className="flex h-full w-full flex-col items-center justify-center px-4 sm:block">
          <h1 className="wrap m-0 w-full text-center text-4xl font-bold sm:absolute sm:top-18 sm:left-18 sm:w-1/2 sm:text-left">
            {t('homeIncognito.welcomeTitle')}
          </h1>
          <p className="wrap m-0 w-full p-4 text-center text-xl font-medium sm:absolute sm:right-40 sm:bottom-140 sm:w-1/2 sm:text-left">
            {t('homeIncognito.welcomeText')}
          </p>
        </div>
      </div>
      <div className="relative mx-auto h-screen max-w-screen overflow-x-hidden overflow-y-hidden">
        <div
          className="inset-0 -z-10"
          style={{
            background: `linear-gradient(to bottom, #A8D0E6 0%, rgba(0, 0, 0, 0.32) 60%), url('/main-page-mountains.jpg') center/cover no-repeat`,
            backgroundColor: '#A8D0E6',
            transform: 'scaleY(-1)',
            width: '100vw',
            height: '100vh',
          }}
        />
        <h1 className="wrap text-background absolute top-12 left-1/2 m-0 w-1/2 -translate-x-1/2 text-center text-4xl font-bold">
          {t('homeIncognito.projectAchievements')}
        </h1>
        <ul className="wrap absolute top-70 left-1/2 flex w-full max-w-screen-xl -translate-x-1/2 flex-col items-center gap-x-0 gap-y-8 text-left text-xl font-medium sm:grid sm:grid-cols-3 sm:items-stretch sm:gap-x-12 sm:gap-y-12">
          <AchievementCard
            icon={<ModeDarkIcon style={{ fontSize: '2rem' }} />}
            description={String(t('homeIncognito.themeAchievement'))}
          />
          <AchievementCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="-5 -5 34 34"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                />
              </svg>
            }
            description={String(t('homeIncognito.languageAchievement'))}
          />
          <AchievementCard
            icon={<ApiOutlined style={{ fontSize: '2rem' }} />}
            description={String(t('homeIncognito.restAchievement'))}
          />
          <li className="m-0 flex w-full list-none justify-center p-0 sm:col-span-3 sm:w-auto">
            <AchievementCard
              icon={<HistoryIcon style={{ fontSize: 36 }} />}
              description={String(t('homeIncognito.historyAchievement'))}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default IncognitoHome;
