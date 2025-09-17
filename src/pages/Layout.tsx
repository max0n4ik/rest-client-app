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
    const faviconUrl = '/favicon.ico';
    const link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = faviconUrl;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = faviconUrl;
      document.head.appendChild(newLink);
    }
  }, [location]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
