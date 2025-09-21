import { createClient } from '@/api/client';
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
  const supabase = createClient();

  async function sendRequest(url: string, method: string, headers: HeadersInit, body?: BodyInit) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, { method, headers, body: ['GET', 'HEAD'].includes(method) ? undefined : body });
      let data: T | string;
      const contentType = res.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = (await res.json()) as T;
      } else {
        data = await res.text();
      }

      const result = {
        status: res.status,
        ok: res.ok,
        data,
      };

      setResponse(result);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        throw new Error(`Error: ${userError.message}`);
      }
      if (user === null) return;
      const { error: insertError } = await supabase.from('rest_history').insert([
        {
          user_id: user.id,
          status: result.status,
          ok: result.ok,
          method,
          url,
          data: result.data,
        },
      ]);
      if (insertError) {
        throw new Error(`Error: ${insertError.message}`);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }
  return { loading, response, error, sendRequest };
}
