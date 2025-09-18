import z from 'zod';

export function createLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z.string().email(t('zodValidation:email_invalid')),
    password: z
      .string()
      .min(8, t('zodValidation:password_min'))
      .regex(/[a-zA-Z]/, t('zodValidation:password_letter'))
      .regex(/\d/, t('zodValidation:password_digit'))
      .regex(/[^a-zA-Z0-9]/, t('zodValidation:password_special')),
  });
}

export function createRegistrationSchema(t: (key: string) => string) {
  return z
    .object({
      email: z.string().email(t('zodValidation:email_invalid')),
      name: z
        .string()
        .min(3, { message: t('zodValidation:name_min') })
        .max(50, { message: t('zodValidation:name_max') })
        .regex(/^[A-ZА-Я]/, { message: t('zodValidation:name_first_uppercase') })
        .regex(/^[A-Za-zА-Яа-я]*$/, { message: t('zodValidation:name_only_letters') })
        .trim()
        .refine((val) => val.length >= 3, {
          message: t('zodValidation:short_name'),
        }),
      password: z
        .string()
        .min(8, { message: t('zodValidation:password_min') })
        .regex(/[a-zA-Z]/, { message: t('zodValidation:password_letter') })
        .regex(/\d/, { message: t('zodValidation:password_digit') })
        .regex(/[^a-zA-Z0-9]/, { message: t('zodValidation:password_special') }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('zodValidation:confirm_password_mismatch'),
      path: ['confirmPassword'],
    });
}

export type LoginData = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegistrationData = z.infer<ReturnType<typeof createRegistrationSchema>>;
