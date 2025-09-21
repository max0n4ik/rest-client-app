import type { LoginData, RegistrationData } from '@/utils/schema';
import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { createClient } from '@/api/client';
interface AuthStoreState {
  session: Session | null;
  user: User | null;
  initializing: boolean;
  loading: boolean;
  error: string | null;
}
interface AuthStoreActions {
  init: () => Promise<void>;
  login: (data: LoginData) => Promise<string | null>;
  register: (data: RegistrationData) => Promise<string | null>;
  logout: () => Promise<void>;
  clearError: () => void;
}
type AuthStore = AuthStoreState & AuthStoreActions;
export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  user: null,
  initializing: true,
  loading: false,
  error: null,
  async init() {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    set({ session: data.session ?? null, user: data.session?.user ?? null, initializing: false });
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session: session ?? null, user: session?.user ?? null });
    });
  },
  async login(formData) {
    set({ loading: true, error: null });
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
      if (error) {
        set({ error: error.message, loading: false });
        return error.message;
      }
      set({ loading: false, error: null });
      return null;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      set({ error: message, loading: false });
      return message;
    }
  },
  async register(formData) {
    set({ loading: true, error: null });
    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { first_name: formData.name } },
      });
      if (signUpError) {
        set({ error: signUpError.message, loading: false });
        return signUpError.message;
      }
      set({ loading: false, error: null });
      return null;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      set({ error: message, loading: false });
      return message;
    }
  },
  async logout() {
    set({ loading: true });
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } finally {
      set({ loading: false, session: null, user: null });
    }
  },
  clearError() {
    set({ error: null });
  },
}));
