import { z } from 'zod'

export const EstablishmentWebsiteUrlSchema = z
  .url({ protocol: /^https$/, error: 'Informe uma URL HTTPS válida.' })
  .max(2048, 'Use no máximo 2048 caracteres.')

export const EstablishmentWebsiteUrlFormSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === '' || EstablishmentWebsiteUrlSchema.safeParse(value).success,
    'Informe uma URL HTTPS válida com até 2048 caracteres.',
  )
