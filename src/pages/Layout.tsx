import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Home Page - RESTify',
      '/login': 'Login - RESTify',
      '/registration': 'Registration - RESTify',
      '/rest-client': 'REST Client - RESTify',
    };
    document.title = titles[location.pathname] || 'RESTify';
  }, [location]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
