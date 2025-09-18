import type { RestResponse } from '@/hooks/useRestClient';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

export function ResponseViewer({
  response,
  error,
  loading,
}: {
  response: RestResponse<unknown> | null;
  error?: string | null;
  loading: boolean;
}) {
  const { t } = useTranslation('restClient');
  if (loading) {
    return (
      <Card className="bg-card-30 border-card-foreground">
        <CardContent className="text-primary flex items-center gap-1 p-4">
          <div>
            <FontAwesomeIcon icon={faHourglassStart} />
          </div>
          <div>{t('sending')}</div>
        </CardContent>
      </Card>
    );
  }

  if (!response && !error) {
    return (
      <Card className="bg-card-30 border-card-foreground">
        <CardContent className="text-primary p-4">{t('placeholder')}</CardContent>
      </Card>
    );
  }

  if (error || !response?.ok) {
    return (
      <Card className="border-transparent bg-transparent shadow-none">
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <label className="w-16 text-sm font-medium">{t('status')}</label>
            <Input value={response?.status} readOnly />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-16 text-sm font-medium">{t('error')}</label>
            <Input value={error ?? (response?.data as { message: string })?.message ?? 'Unknown error'} readOnly />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-transparent bg-transparent shadow-none">
      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <label className="w-16 text-sm font-medium">{t('status')}</label>
          <Input value={response.status} readOnly />
        </div>

        <div className="h-full">
          <Textarea
            name="response"
            readOnly
            className="h-full font-mono text-sm"
            value={JSON.stringify(response.data, null, 2)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
