import Footer from '@/shared/Footer/Footer';
import Header from '@/shared/Header/Header';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
