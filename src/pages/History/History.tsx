import { getServerClient } from '@/api/server';
import type { Route } from './+types/History';
import { Link, redirect, type LoaderFunctionArgs } from 'react-router';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = getServerClient(request);
  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  if (!user) {
    return redirect('/');
  }

  const { data, error } = await supabase.client
    .from('rest_history')
    .select('*')
    .eq('user_id', user.id)
    .order('timestamp', { ascending: false });
  if (error) {
    throw new Response('Error with load', { status: 500 });
  }

  return { data };
}

export default function History({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation('history');
  return (
    <section
      className="flex h-1/1 w-1/1 min-w-1/1 flex-col items-start gap-6 px-8 py-6"
      style={{
        backgroundImage: `url('images/rest-client-mountains.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <h2 className="text-primary text-4xl font-semibold">{t('title')}</h2>
      <div className="w-1/1 space-y-5">
        {loaderData.data.length === 0 && (
          <>
            <p className="text-xl font-medium">{t('empty')}</p>
            <Link
              replace
              to="/rest-client"
              className="bg-secondary hover:bg-primary w-full cursor-pointer rounded px-6 py-2 text-center font-semibold text-white shadow">
              {t('button')}
            </Link>
          </>
        )}
        {loaderData.data.map(({ method, timestamp, url, data }, index) => {
          const date = new Intl.DateTimeFormat('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(timestamp));

          return (
            <div
              key={index}
              className="flex max-h-[900px] flex-col gap-4 overflow-auto rounded-lg border border-[var(--card-foreground)] bg-gradient-to-b p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-6 last:mb-0">
                <div>
                  <h3 className="text-primary mb-2 text-base font-medium">{t('method', { method })}</h3>
                  <h4 className="text-primary/50 mb-2 text-sm">{date}</h4>
                </div>
                <ul>
                  <li className="flex items-center space-x-2">
                    <label className="font-medium" htmlFor={`endpoint-${index}`}>
                      {t('endpointUrl')}
                    </label>
                    <Textarea
                      className="border-primary h-full min-h-7 w-[350px] min-w-[350px] resize rounded border bg-white/30 pl-1 text-sm"
                      name={`endpoint-${index}`}
                      id={`endpoint-${index}`}
                      readOnly
                      value={url}
                    />
                  </li>
                  <li className="mt-4 flex items-center space-x-2">
                    <label className="font-medium" htmlFor={`response-${index}`}>
                      {t('response')}
                    </label>
                    <Textarea
                      className="border-primary h-full min-h-7 w-[350px] min-w-[350px] resize rounded border bg-white/30 pl-1 text-sm"
                      name={`response-${index}`}
                      id={`response-${index}`}
                      readOnly
                      value={JSON.stringify(data, null, 2)}
                    />
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
