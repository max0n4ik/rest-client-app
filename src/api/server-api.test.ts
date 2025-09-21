import { describe, it, expect, vi } from 'vitest';
import { getServerClient } from './server';

vi.stubEnv('VITE_SUPABASE_URL', 'http://fake-url.com');
vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'fake-anon-key');

describe('getServerClient', () => {
  it('should create a Supabase client and return headers object', () => {
    const request = new Request('http://localhost:3000/');

    const { client, headers } = getServerClient(request);

    expect(client).toBeDefined();
    expect(headers).toBeDefined();

    expect(client).toHaveProperty('auth');
    expect(client).toHaveProperty('from');

    expect(headers).toBeInstanceOf(Headers);
  });
});
