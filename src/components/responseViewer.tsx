import type { RestResponse } from '@/hooks/useRestClient';

export function ResponseViewer({
  response,
  error,
  loading,
}: {
  response: RestResponse<unknown>;
  error?: string | null;
  loading: boolean;
}) {
  if (loading) return <div className="p-4">⏳ Sending request...</div>;
  if (error) return <div className="p-4 text-red-500">❌ {error}</div>;
  if (!response) return <div className="p-4 text-gray-500">No response yet</div>;

  return (
    <div className="border-t p-4">
      <div>
        Status: {response.status} ({response.ok ? 'OK' : 'Error'})
      </div>
      <pre className="overflow-auto rounded bg-gray-900 p-4 text-green-400">
        {JSON.stringify(response.data, null, 2)}
      </pre>
    </div>
  );
}
