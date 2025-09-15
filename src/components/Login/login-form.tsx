import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/utils/utils';
import { useState } from 'react';
import { loginScheme } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldValues } from 'react-hook-form';
import { useAuthStore } from '@/store/AuthState';

export default function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>): React.JSX.Element {
  const submitted = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur', resolver: zodResolver(loginScheme) });

  const onSubmit = (data: FieldValues) => {
    try {
      submitted(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
      </div>

      <div className="grid gap-6">
        <div className="relative grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            required
            aria-describedby="email-error"
            {...register('email')}
          />
          {errors.email?.message && (
            <div className="absolute top-full left-0 mt-1">
              <div className='className="absolute bg-background border-destructive text-destructive shadow-lg" top-1/4 left-full z-10 ml-2 w-max -translate-y-1/4 rounded border px-2 py-1 text-sm font-medium'>
                {errors.email?.message}
              </div>
            </div>
          )}
        </div>
        <div className="relative grid gap-2">
          <div className="relative">
            <Label htmlFor="email">Password</Label>
            <div className="relative">
              <Input
                id="password"
                autoComplete="off"
                type={showPassword ? 'text' : 'password'}
                required
                aria-describedby="password-error"
                className="pr-10"
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
            </div>
          </div>
          {errors.password?.message && (
            <div className="absolute top-full left-0 mt-1">
              <div className='className="absolute bg-background border-destructive text-destructive shadow-lg" top-1/4 left-full z-10 ml-2 w-max -translate-y-1/4 rounded border px-2 py-1 text-sm font-medium'>
                {errors.password?.message}
              </div>
            </div>
          )}
        </div>
        {/* {state?.message && !state?.errors && <p className="text-destructive text-sm font-medium">{state.message}</p>} */}

        <Button type="submit" className="w-full" aria-disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </form>
  );
}
