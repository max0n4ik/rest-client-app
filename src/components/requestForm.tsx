import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;
type Method = (typeof METHODS)[number];

const requestSchema = z.object({
  url: z.url('Введите корректный URL'),
  method: z.enum(METHODS),
  headers: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
  body: z.string().optional(),
});

type FormData = z.infer<typeof requestSchema>;

export function RequestForm({
  onSend,
}: {
  onSend: (url: string, method: string, headers: Record<string, string>, body?: BodyInit) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramMethod = searchParams.get('method')?.toUpperCase() as Method | null;
  const paramUrl = searchParams.get('url') ? atob(searchParams.get('url') ?? '') : '';
  const paramBody = searchParams.get('body') ? atob(searchParams.get('body') ?? '') : '';

  const paramHeaders: { key: string; value: string }[] = [];
  searchParams.forEach((v, k) => {
    if (k.startsWith('header_')) {
      paramHeaders.push({ key: k.replace('header_', ''), value: v });
    }
  });

  const defaultMethod: Method = METHODS.includes(paramMethod as Method) ? (paramMethod as Method) : 'GET';

  const form = useForm<FormData>({
    resolver: zodResolver(requestSchema),
    mode: 'onChange',
    defaultValues: {
      method: defaultMethod,
      url: paramUrl || '',
      body: paramBody || '',
      headers: paramHeaders.length ? paramHeaders : [{ key: '', value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'headers',
  });

  const method = form.watch('method');
  const url = form.watch('url');
  const body = form.watch('body');
  const headers = form.watch('headers');

  const encodedUrl = btoa(url);
  const encodedBody = body ? btoa(body) : undefined;

  const generatedCode = JSON.stringify(
    {
      method: method,
      url: encodedUrl,
      headers: headers.reduce<{ key: string; value: string } | object>(
        (acc, header: { key: string; value: string }) => (header.key ? { ...acc, [header.key]: header.value } : acc),
        {}
      ),
      body: encodedBody ? encodedBody : '',
    },
    null,
    2
  );

  useEffect(() => {
    if (!['POST', 'PUT', 'PATCH'].includes(method)) form.setValue('body', '');
  }, [form, method]);

  function onSubmit(data: FormData) {
    const headersObj: Record<string, string> = {};
    data.headers.forEach((h) => {
      if (h.key) headersObj[h.key] = h.value;
    });

    const urlBase64 = btoa(data.url);
    const bodyBase64 = data.body ? btoa(data.body) : undefined;

    const params = new URLSearchParams();
    params.set('method', data.method);
    params.set('url', urlBase64);
    Object.entries(headersObj).forEach(([k, v]) => params.append(`header_${k}`, v));
    if (bodyBase64) params.set('body', bodyBase64);
    setSearchParams(params, { replace: true });

    onSend(data.url, data.method, headersObj, data.body);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Card className="flex items-center gap-3 border-b border-transparent bg-transparent shadow-none">
          <div className="flex min-h-[90px] w-full items-start gap-2">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem className="pt-[25px]">
                  <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="border-card-foreground min-w-[90px]">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      {METHODS.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label htmlFor="url">Endpoint URL</Label>
                  <FormControl>
                    <Input id="url" placeholder="https://api.example.com/resource" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="space-y-3 border-transparent bg-transparent shadow-none">
          <div className="flex items-center justify-between">
            <FormLabel className="text-2xl">Header(s)</FormLabel>
            <Button type="button" variant="default" size="sm" onClick={() => append({ key: '', value: '' })}>
              Add Header
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`headers.${index}.key`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Label htmlFor={`headers.${index}.key`}>Header Key</Label>
                    <FormControl>
                      <Input id={`headers.${index}.key`} placeholder="Key" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`headers.${index}.value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Label htmlFor={`headers.${index}.value`}>Header Value</Label>
                    <FormControl>
                      <Input id={`headers.${index}.value`} placeholder="Value" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="mt-[25px]" type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </div>
          ))}
        </Card>

        {['POST', 'PUT', 'PATCH'].includes(method) && (
          <Card className="border-transparent bg-transparent shadow-none">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="block text-2xl">Request Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="JSON body" className="h-48 font-mono text-xs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        )}

        <div className="text-primary space-y-3">
          <FormLabel className="block text-2xl">Generated request code:</FormLabel>
          <Card className="shadow-non border-card-foreground bg-card-30 p-4 font-mono text-xs whitespace-pre-wrap">
            <pre>{generatedCode}</pre>
          </Card>
        </div>

        <Button type="submit" disabled={!form.formState.isValid}>
          Send Request
        </Button>
      </form>
    </Form>
  );
}
