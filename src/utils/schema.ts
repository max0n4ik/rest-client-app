import z from 'zod';

export const loginScheme = z.object({
  email: z.email('Invalid email address, (e.g., example@email.com)'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/\d/, 'Password must contain at least one digit')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
});

export const registrationScheme = z
  .object({
    email: z.email('Invalid email address, (e.g., example@email.com)'),
    name: z
      .string()
      .min(3, { message: 'Minimum 3 characters required' })
      .max(50, { message: 'Maximum 50 characters allowed' })
      .regex(/^[A-ZА-Я]/, { message: 'First character must be uppercase' })
      .regex(/^[A-Za-zА-Яа-я]*$/, { message: 'Only letters allowed, no spaces or special characters' })
      .trim()
      .refine((val) => val.length >= 3, {
        message: 'Name is too short',
      }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
      .regex(/\d/, 'Password must contain at least one digit')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });

export type LoginData = z.infer<typeof loginScheme>;
export type RegistrationData = z.infer<typeof registrationScheme>;
