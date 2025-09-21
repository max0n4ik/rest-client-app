import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { createLoginSchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldValues } from 'react-hook-form';
import { useAuthStore } from '@/store/AuthState';
import { Tooltip } from '../ui/error-message';
import { useTranslation } from 'react-i18next';
export default function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>): React.JSX.Element {
  const { t } = useTranslation('login');
  const { t: tValidation } = useTranslation('zodValidation');
  const login = useAuthStore((state) => state.login);
  const storeError = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const loading = useAuthStore((state) => state.loading);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(createLoginSchema(tValidation as (key: string) => string)) });
  useEffect(() => {
    setError(storeError);
  }, [storeError]);
  const onSubmit = async (FormData: FieldValues) => {
    clearError();
    const errors = await login({ email: FormData.email as string, password: FormData.password as string });
    if (errors) {
      setError(errors);
      return;
    }
    reset();
    toast.success('Successfully logged in');
    navigate('/');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
      {' '}
      <div className="flex flex-col items-center gap-2 text-center">
        {' '}
        <h1 className="font-serif text-[30px]">{t('title')}</h1>{' '}
      </div>{' '}
      <div className="grid gap-6">
        {' '}
        <div className="relative grid gap-2">
          {' '}
          <Label htmlFor="email">{t('email')}</Label>{' '}
          <Input
            id="email"
            type="email"
            placeholder={t('email')}
            required
            aria-describedby="email-error"
            {...register('email')}
          />{' '}
          {errors.email?.message && (
            <div className="absolute top-full left-0 mt-1">
              {' '}
              <Tooltip message={errors.email?.message} />{' '}
            </div>
          )}{' '}
        </div>{' '}
        <div className="relative grid gap-2">
          {' '}
          <div className="relative">
            {' '}
            <Label htmlFor="password">{t('password')}</Label>{' '}
            <div className="relative">
              {' '}
              <Input
                id="password"
                autoComplete="off"
                type={showPassword ? 'text' : 'password'}
                required
                aria-describedby="password-error"
                className="pr-10"
                placeholder={t('password')}
                {...register('password')}
              />{' '}
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-2 my-auto flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {' '}
                {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}{' '}
              </button>{' '}
            </div>{' '}
          </div>{' '}
          {errors.password?.message && (
            <div className="absolute top-full left-0 mt-1">
              {' '}
              <Tooltip message={errors.password?.message} />{' '}
            </div>
          )}{' '}
        </div>{' '}
        {error ? <p className="text-destructive text-sm font-medium">{error}</p> : null}{' '}
        <Button variant={'secondary'} type="submit" className="w-full" aria-disabled={isSubmitting || loading}>
          {' '}
          {isSubmitting || loading ? t('loggingIn') : t('login')}{' '}
        </Button>{' '}
      </div>{' '}
    </form>
  );
}
