import z from 'zod';

export const loginScheme = z.object({
  email: z.email('Invalid email address, (e.g., example@email.com)'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      'Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
    ),
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
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        'Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
      ),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        'Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });

export type LoginData = z.infer<typeof loginScheme>;
export type RegistrationData = z.infer<typeof registrationScheme>;
