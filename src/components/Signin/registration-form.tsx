import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { createRegistrationSchema } from '@/utils/schema';
import { Tooltip } from '../ui/error-message';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/AuthState';
export default function RegistrationForm(): React.JSX.Element {
  const { t } = useTranslation('registration');
  const { t: tValidation } = useTranslation('zodValidation');
  const navigate = useNavigate();
  const registerUser = useAuthStore((s) => s.register);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(createRegistrationSchema(tValidation as (key: string) => string)) });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setError(null);
  }, []);
  const onSubmit = async (FormData: FieldValues) => {
    const { email, password, name } = FormData as { email: string; password: string; name: string };
    const err = await registerUser({ email, password, name });
    if (err) {
      setError(err);
      return;
    }
    reset();
    toast.success('Successfully registered');
    navigate('/');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-6')}>
      {' '}
      <div className="flex flex-col items-center gap-2 text-center">
        {' '}
        <h1 className="text-2xl font-bold">{t('title')}</h1>{' '}
        <p className="text-muted-foreground text-sm text-balance">{t('subtitle')}</p>{' '}
      </div>{' '}
      <div className="grid gap-6">
        {' '}
        <div className="relative grid gap-2">
          {' '}
          <Label htmlFor="email">{t('email')}</Label>{' '}
          <Input id="email" type="email" placeholder={t('email')} {...register('email')} />{' '}
          {errors.email && (
            <div className="absolute top-full left-0 mt-1">
              {' '}
              <Tooltip message={errors.email.message} />{' '}
            </div>
          )}{' '}
        </div>{' '}
        <div className="relative grid gap-2">
          {' '}
          <Label htmlFor="name">{t('name')}</Label>{' '}
          <div className="relative">
            {' '}
            <Input id="name" type="text" autoComplete="off" placeholder={t('name')} {...register('name')} />{' '}
            {errors.name && (
              <div className="absolute top-full left-0 mt-1">
                {' '}
                <Tooltip message={errors.name.message} />{' '}
              </div>
            )}{' '}
          </div>{' '}
        </div>{' '}
        <div className="relative grid gap-2">
          {' '}
          <Label htmlFor="password">{t('password')}</Label>{' '}
          <div className="relative">
            {' '}
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="off"
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
            {errors.password && (
              <div className="absolute top-full left-0 mt-1">
                {' '}
                <Tooltip message={errors.password.message} />{' '}
              </div>
            )}{' '}
          </div>{' '}
        </div>{' '}
        <div className="relative grid gap-2">
          {' '}
          <Label htmlFor="confirmPassword">{t('repeatPassword')}</Label>{' '}
          <div className="relative">
            {' '}
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="off"
              placeholder={t('repeatPassword')}
              {...register('confirmPassword')}
            />{' '}
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}>
              {' '}
              {showConfirmPassword ? <EyeOff size={21} /> : <Eye size={21} />}{' '}
            </button>{' '}
            {errors.confirmPassword && (
              <div className="absolute top-full left-0 mt-1">
                {' '}
                <Tooltip message={errors.confirmPassword.message} />{' '}
              </div>
            )}{' '}
          </div>{' '}
        </div>{' '}
        {error ? <p className="text-destructive text-sm font-medium">{error}</p> : null}{' '}
        <Button variant={'secondary'} type="submit" className="w-full">
          {' '}
          {isSubmitting ? t('signingUp') : t('signUp')}{' '}
        </Button>{' '}
      </div>{' '}
    </form>
  );
}
