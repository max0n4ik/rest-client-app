import { create } from 'zustand';

interface AuthStore {
  errors: string[] | null;
  login: (data: unknown) => void;
}

export const useAuthStore = create<AuthStore>(() => ({
  errors: null,
  login(data) {
    console.log(data);
  },
}));
