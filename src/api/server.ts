import { parseCookieHeader, serializeCookieHeader, createServerClient } from '@supabase/ssr';
export const getServerClient = (request: Request) => {
  const headers = new Headers();
  const supabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        get(name) {
          const parsed = parseCookieHeader(request.headers.get('Cookie') ?? '') as
            | { name: string; value?: string }[]
            | null;
          const cookie = parsed?.find((c) => c.name === name);
          return cookie?.value;
        },
        set(name, value, options) {
          headers.append('Set-Cookie', serializeCookieHeader(name, value, options));
        },
        remove(name, options) {
          headers.append('Set-Cookie', serializeCookieHeader(name, '', { ...options, maxAge: 0 }));
        },
      },
    }
  );
  return { client: supabase, headers: headers };
};
