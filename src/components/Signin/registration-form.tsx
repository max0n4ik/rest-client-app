import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/utils';
import { useAuthStore } from '@/store/AuthState';
// import useRegistrationStore from '@/store/registration';
// import type { RegistrationStepProps } from '@/utils/interfaces';
// import { validateRegistrationCredentials, type RegistrationCredentials } from '@/utils/schema';

export default function RegistrationForm(): React.JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const submitted = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => {
      return Object.fromEntries(Object.entries(prevErrors).filter(([key]) => key !== name));
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    submitted(e);
    e.preventDefault();
    setErrors(errors);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6')}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold capitalize">Get started now</h1>
        <p className="text-muted-foreground text-sm text-balance">Enter your Credentials to create your account</p>
      </div>
      <div className="grid gap-6">
        <div className="relative grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="absolute top-full left-0 mt-1">
              <div className='className="absolute bg-background border-destructive text-destructive shadow-lg" top-1/4 left-full z-10 ml-2 w-max -translate-y-1/4 rounded border px-2 py-1 text-sm font-medium'>
                {errors.email}
              </div>
            </div>
          )}
        </div>
        <div className="relative grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="off"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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
                <div className='className="absolute bg-background border-destructive text-destructive shadow-lg" top-1/4 left-full z-10 ml-2 w-max -translate-y-1/4 rounded border px-2 py-1 text-sm font-medium'>
                  {errors.password}
                </div>
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
              name="confirmPassword"
              autoComplete="off"
              placeholder="Repeat password"
              value={formData.confirmPassword}
              onChange={handleChange}
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
                <div className='className="absolute bg-background border-destructive text-destructive shadow-lg" top-1/4 left-full z-10 ml-2 w-max -translate-y-1/4 rounded border px-2 py-1 text-sm font-medium'>
                  {errors.confirmPassword}
                </div>
              </div>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full">
          Next
        </Button>
      </div>
    </form>
  );
}
