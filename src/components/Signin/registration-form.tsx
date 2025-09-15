import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldValues } from 'react-hook-form';
import { useFetcher, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { registrationScheme } from '@/utils/schema';
import { Tooltip } from '../ui/error-message';
// import useRegistrationStore from '@/store/registration';
// import type { RegistrationStepProps } from '@/utils/interfaces';
// import { validateRegistrationCredentials, type RegistrationCredentials } from '@/utils/schema';

export default function RegistrationForm(): React.JSX.Element {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur', resolver: zodResolver(registrationScheme) });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fetcher.data && typeof fetcher.data === 'object') {
      const payload = fetcher.data as { error?: string | null; message?: string };
      if (payload.error) {
        setError(payload.error);
      } else {
        setError(null);
        if (payload.message) {
          reset();
          toast.success('Successfully registered');
          navigate('/');
        }
      }
    }
  }, [fetcher.data, reset, navigate]);

  const onSubmit = (FormData: FieldValues) => {
    fetcher.submit(FormData as Record<string, string>, { method: 'post', action: '/registration' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-6')}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold capitalize">Get started now</h1>
        <p className="text-muted-foreground text-sm text-balance">Enter your Credentials to create your account</p>
      </div>
      <div className="grid gap-6">
        <div className="relative grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Email" {...register('email')} />
          {errors.email && (
            <div className="absolute top-full left-0 mt-1">
              <Tooltip message={errors.email.message} />
            </div>
          )}
        </div>
        <div className="relative grid gap-2">
          <Label htmlFor="name">Name</Label>
          <div className="relative">
            <Input id="name" type="text" autoComplete="off" placeholder="Name" {...register('name')} />
            {errors.name && (
              <div className="absolute top-full left-0 mt-1">
                <Tooltip message={errors.name.message} />
              </div>
            )}
          </div>
        </div>
        <div className="relative grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="off"
              placeholder="Password"
              {...register('password')}
            />
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-2 my-auto flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
            {errors.password && (
              <div className="absolute top-full left-0 mt-1">
                <Tooltip message={errors.password.message} />
              </div>
            )}
          </div>
        </div>
        <div className="relative grid gap-2">
          <Label htmlFor="confirmPassword">Repeat password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="off"
              placeholder="Repeat password"
              {...register('confirmPassword')}
            />
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}>
              {showConfirmPassword ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
            {errors.confirmPassword && (
              <div className="absolute top-full left-0 mt-1">
                <Tooltip message={errors.confirmPassword.message} />
              </div>
            )}
          </div>
        </div>
        {error ? <p className="text-destructive text-sm font-medium">{error}</p> : null}
        <Button variant={'secondary'} type="submit" className="w-full">
          {isSubmitting ? 'Send...' : 'Sign Up'}
        </Button>
      </div>
    </form>
  );
}
