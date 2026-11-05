import { z } from 'zod'

import { EstablishmentSettingsSchema } from './establishment-settings.schema'

export const EstablishmentSettingsApiResponseSchema =
  EstablishmentSettingsSchema.extend({
    id: z.uuid(),
    organizationId: z.string().min(1).optional(),
    name: z.string(),
    slug: z.string(),
  })
    .partial({
      websiteUrl: true,
      requiresBookingDeposit: true,
      paymentLink: true,
      paymentQrCodeUrl: true,
      primaryColor: true,
      secondaryColor: true,
      tertiaryColor: true,
    })
    .transform((establishment) => ({
      ...establishment,
      websiteUrl: establishment.websiteUrl ?? null,
      requiresBookingDeposit: establishment.requiresBookingDeposit ?? false,
      paymentLink: establishment.paymentLink ?? null,
      paymentQrCodeUrl: establishment.paymentQrCodeUrl ?? null,
      primaryColor: establishment.primaryColor ?? null,
      secondaryColor: establishment.secondaryColor ?? null,
      tertiaryColor: establishment.tertiaryColor ?? null,
    }))
