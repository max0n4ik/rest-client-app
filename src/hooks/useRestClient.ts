import { useState } from 'react';

export interface RestResponse<T = unknown> {
  status: number;
  ok: boolean;
  data: T | string;
}

export function useRestClient<T = unknown>() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<RestResponse<T> | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function sendRequest(url: string, method: string, headers: HeadersInit, body?: BodyInit) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method,
        headers,
        body: ['GET', 'HEAD'].includes(method) ? undefined : body,
      });

      const data: T = JSON.parse(await res.json());

      setResponse({
        status: res.status,
        ok: res.ok,
        data,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return { loading, response, error, sendRequest };
}
