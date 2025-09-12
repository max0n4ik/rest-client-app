import Footer from '@/shared/Footer/Footer';
import Header from '@/shared/Header/Header';
import IncognitoHome from './IncognitoHome';
import AuthorizedHome from './AuthorizedHome';

export default function Home() {
  const randomNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  return (
    <>
      <Header />
      {randomNumber % 2 === 0 ? <IncognitoHome /> : <AuthorizedHome />}
      <Footer />
    </>
  );
}
