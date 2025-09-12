import { useState } from 'react';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export function RequestForm({
  onSend,
}: {
  onSend: (url: string, method: string, headers: HeadersInit, body?: BodyInit) => void;
}) {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('{}');
  const [body, setBody] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let parsedHeaders: HeadersInit = {};
    try {
      parsedHeaders = JSON.parse(headers);
    } catch {
      alert('Headers должны быть в формате JSON');
    }
    onSend(url, method, parsedHeaders, body);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="rounded border p-2">
          {METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="https://api.example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded border p-2"
        />
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
          Send
        </button>
      </div>

      {['POST', 'PUT', 'PATCH'].includes(method) && (
        <textarea
          placeholder="Request body (JSON)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="h-32 rounded border p-2"
        />
      )}

      <textarea
        placeholder='Headers (JSON, например: { "Authorization": "Bearer ..." })'
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        className="h-20 rounded border p-2"
      />
    </form>
  );
}
