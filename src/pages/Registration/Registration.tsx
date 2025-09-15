import { Link } from 'react-router';

import RegistrationForm from 'src/components/Signin/registration-form';

export default function Registration(): React.JSX.Element {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-xs">
            <RegistrationForm />
          </div>
          <div className="mt-6 flex items-center text-sm text-gray-500">
            <div className="h-px w-[140px] bg-gray-300" />
            <span className="px-3">or</span>
            <div className="h-px w-[140px] bg-gray-300" />
          </div>
          <div className="text-center text-sm">
            Have an account?{' '}
            <Link to="login" className="text-primary hover:text-accent">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="images/login-mountains.jpg"
          alt="export"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
