import { getServerClient } from '@/api/server';
import { RequestForm } from '@/components/RequestForm/requestForm';
import { ResponseViewer } from '@/components/ResponseViewer/responseViewer';
import { useRestClient } from '@/hooks/useRestClient';
import { useTranslation } from 'react-i18next';
import { redirect, type LoaderFunctionArgs } from 'react-router';
export async function loader({ request }: LoaderFunctionArgs) {
  const { client, headers } = getServerClient(request);
  const { data } = await client.auth.getSession();
  if (!data.session) {
    throw redirect('/', { headers });
  }
  return null;
}
export default function RestfulClient() {
  const { loading, response, error, sendRequest } = useRestClient();
  const { t } = useTranslation('restClient');
  return (
    <div
      className="grid h-1/1 w-1/1 min-w-1/1 items-center gap-6 px-8 py-6 md:grid-cols-2"
      style={{
        backgroundImage: `url('images/rest-client-mountains.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      {' '}
      <div className="flex h-1/1 max-h-[900px] flex-col gap-4 overflow-auto rounded-lg border border-[var(--card-foreground)] bg-gradient-to-b p-6 shadow-lg backdrop-blur-sm">
        {' '}
        <h2 className="text-primary mb-2 text-3xl font-bold">{t('request')}</h2>{' '}
        <RequestForm onSend={sendRequest} />{' '}
      </div>{' '}
      <div className="flex h-1/1 max-h-[900px] flex-col gap-4 overflow-auto rounded-lg border border-[var(--card-foreground)] bg-gradient-to-b p-6 shadow-lg backdrop-blur-sm">
        {' '}
        <h2 className="text-primary mb-2 text-3xl font-bold">{t('response')}</h2>{' '}
        <ResponseViewer response={response} error={error} loading={loading} />{' '}
      </div>{' '}
    </div>
  );
}
