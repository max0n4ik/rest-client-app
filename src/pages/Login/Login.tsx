import React from 'react';

import LoginForm from '@/components/Login/login-form';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router';

export default function LoginPage(): React.JSX.Element {
  const { t } = useTranslation('login');

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
          <div className="mt-6 flex items-center text-sm text-gray-500">
            <div className="h-px w-[140px] bg-gray-300" />
            <span className="px-3">{t('or')}</span>
            <div className="h-px w-[140px] bg-gray-300" />
          </div>
          <div className="text-center text-sm">
            {t('haveNoAccount')}{' '}
            <Link to="/registration" className="text-primary hover:text-accent">
              {t('signUp')}
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Link to="/" className="absolute inset-[45%] z-10 text-5xl font-bold">
          RESTify
        </Link>
        <img
          src="images/login-mountains.jpg"
          alt="export"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
