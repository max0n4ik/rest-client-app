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
    function setFavicon(url: string) {
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      if (link.href !== window.location.origin + url) {
        link.href = url;
      }
    }
    setFavicon(faviconUrl);
  }, [location]);
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
