import { RequestForm } from '@/components/requestForm';
import { ResponseViewer } from '@/components/responseViewer';
import { useRestClient } from '@/hooks/useRestClient';

export default function RestfulClient() {
  const { loading, response, error, sendRequest } = useRestClient();

  return (
    <div className="mx-auto mt-8 max-w-4xl rounded border shadow">
      <h1 className="border-b p-4 text-2xl font-bold">RESTful Client</h1>
      <RequestForm onSend={sendRequest} />
      {response && <ResponseViewer response={response} error={error} loading={loading} />}
    </div>
  );
}
