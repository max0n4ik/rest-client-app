import IncognitoHome from './IncognitoHome';
import AuthorizedHome from './AuthorizedHome';
import { useAuthStore } from '@/store/AuthState';

export default function Home() {
  const login = useAuthStore((state) => state.user);

  if (login !== null) return <AuthorizedHome />;
  return <IncognitoHome />;
}
