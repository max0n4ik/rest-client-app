import { Link, redirect, type LoaderFunctionArgs } from 'react-router';
import RegistrationForm from '@/components/Signin/registration-form';
import { getServerClient } from '@/api/server';
import { useTranslation } from 'react-i18next';
export async function loader({ request }: LoaderFunctionArgs) {
  const { client, headers } = getServerClient(request);
  const { data } = await client.auth.getSession();
  if (data.session) {
    throw redirect('/', { headers });
  }
  return null;
}
export default function Registration(): React.JSX.Element {
  const { t } = useTranslation('registration');
  return (
    <div className="grid min-h-full lg:grid-cols-2">
      {' '}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {' '}
        <div className="flex flex-1 flex-col items-center justify-center">
          {' '}
          <div className="w-full max-w-xs">
            {' '}
            <RegistrationForm />{' '}
          </div>{' '}
          <div className="mt-6 flex items-center text-sm text-gray-500">
            {' '}
            <div className="h-px w-[140px] bg-gray-300" /> <span className="px-3">{t('or')}</span>{' '}
            <div className="h-px w-[140px] bg-gray-300" />{' '}
          </div>{' '}
          <div className="text-center text-sm">
            {' '}
            {t('haveAccount')}{' '}
            <Link to="/login" className="text-primary hover:text-accent">
              {' '}
              {t('signIn')}{' '}
            </Link>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
      <div className="bg-muted relative hidden lg:block">
        {' '}
        <Link to="/" className="absolute inset-[45%] z-10 text-5xl font-bold">
          {' '}
          RESTify{' '}
        </Link>{' '}
        <img
          src="images/login-mountains.jpg"
          alt="export"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />{' '}
      </div>{' '}
    </div>
  );
}
