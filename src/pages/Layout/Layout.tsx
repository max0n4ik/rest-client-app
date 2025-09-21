import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
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
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.href = faviconUrl;
      document.head.appendChild(link);
    } else if (link.href !== window.location.origin + faviconUrl) {
      link.href = faviconUrl;
    }
  }, [location.pathname]);
  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
