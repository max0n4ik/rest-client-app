import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createClient } from './client';
import { createBrowserClient } from '@supabase/ssr';

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(),
}));

describe('createClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it('should call createBrowserClient with environment variables', () => {
    const testUrl = 'https://test-url.supabase.co';
    const testKey = 'test-public-key';
    vi.stubEnv('VITE_SUPABASE_URL', testUrl);
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', testKey);

    createClient();

    expect(createBrowserClient).toHaveBeenCalledTimes(1);
    expect(createBrowserClient).toHaveBeenCalledWith(testUrl, testKey);
  });

  it('should throw an error if environment variables are missing', () => {
    vi.stubEnv('VITE_SUPABASE_URL', undefined);
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', undefined);

    const action = () => createClient();
    expect(action).toThrow('Missing Supabase environment variables');
  });
});
