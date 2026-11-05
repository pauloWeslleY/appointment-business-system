import { z } from 'zod'

import { EstablishmentWebsiteUrlSchema } from '@/features/establishment/schemas/establishment-website-url.schema'

export const PaymentHttpsUrlSchema = z
  .url({ protocol: /^https$/, error: 'Informe uma URL HTTPS válida.' })
  .max(2048, 'Use no máximo 2048 caracteres.')
export const EstablishmentHexColorSchema = z
  .string()
  .regex(
    /^#[0-9a-f]{6}$/i,
    'Use uma cor hexadecimal com seis dígitos, como #321E48.',
  )
export const EstablishmentSettingsSchema = z.object({
  websiteUrl: EstablishmentWebsiteUrlSchema.nullable(),
  requiresBookingDeposit: z.boolean(),
  paymentLink: PaymentHttpsUrlSchema.nullable(),
  paymentQrCodeUrl: PaymentHttpsUrlSchema.nullable(),
  primaryColor: EstablishmentHexColorSchema.nullable(),
  secondaryColor: EstablishmentHexColorSchema.nullable(),
  tertiaryColor: EstablishmentHexColorSchema.nullable(),
})

export const EstablishmentSettingsScopeSchema = z.object({
  userId: z.string().min(1),
  organizationId: z.string().min(1),
  slug: z.string().trim().min(1).max(100),
})
