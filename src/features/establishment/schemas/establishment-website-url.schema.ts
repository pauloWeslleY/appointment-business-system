import { z } from 'zod'

export const EstablishmentWebsiteUrlSchema = z
  .string()
  .max(2048, 'Use no máximo 2048 caracteres.')

export const EstablishmentWebsiteUrlFormSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === '' || EstablishmentWebsiteUrlSchema.safeParse(value).success,
    'Informe uma URL HTTPS válida com até 2048 caracteres.',
  )
