import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation('home');
  return <div className="text-6xl">{t('hello')}</div>;
}
