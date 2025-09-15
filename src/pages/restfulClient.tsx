import { RequestForm } from '@/components/requestForm';
import { ResponseViewer } from '@/components/responseViewer';
import { useRestClient } from '@/hooks/useRestClient';

export default function RestfulClient() {
  const { loading, response, error, sendRequest } = useRestClient();

  return (
    <div
      className="grid h-1/1 w-1/1 min-w-1/1 items-center gap-6 px-8 py-6 md:grid-cols-2"
      style={{
        backgroundImage: `url('/rest-client-mountains.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="flex h-1/1 max-h-[900px] flex-col gap-4 overflow-auto rounded-lg border border-[var(--card-foreground)] bg-gradient-to-b p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-primary mb-2 text-3xl font-bold">Request</h2>
        <RequestForm onSend={sendRequest} />
      </div>
      <div className="flex h-1/1 max-h-[900px] flex-col gap-4 overflow-auto rounded-lg border border-[var(--card-foreground)] bg-gradient-to-b p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-primary mb-2 text-3xl font-bold">Response</h2>
        <ResponseViewer response={response} error={error} loading={loading} />
      </div>
    </div>
  );
}
