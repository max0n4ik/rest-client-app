import { Link } from 'react-router';

import RegistrationForm from 'src/components/Signin/registration-form';
import type { Route } from '../../+types/root';
import { getServerClient } from '@/api/server';

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
            <Link to="/login" className="text-primary hover:text-accent">
              Sign in
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

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  const { client, headers } = getServerClient(request);
  const { error } = await client.auth.signUp({ email, password });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...Object.fromEntries(headers) },
    });
  }

  return new Response(JSON.stringify({ message: 'Check your email to confirm registration' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...Object.fromEntries(headers) },
  });
}
