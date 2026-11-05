import { EstablishmentSettingsSchema } from './establishment-settings.schema'

export const EstablishmentSettingsApiRequestSchema =
  EstablishmentSettingsSchema.partial().superRefine((data, ctx) => {
    if (data.requiresBookingDeposit && !data.paymentLink) {
      ctx.addIssue({
        code: 'custom',
        path: ['paymentLink'],
        message: 'Informe o link de pagamento para exigir sinal.',
      })
    }

    if (data.requiresBookingDeposit && !data.paymentQrCodeUrl) {
      ctx.addIssue({
        code: 'custom',
        path: ['paymentQrCodeUrl'],
        message: 'Informe o QR Code de pagamento para exigir sinal.',
      })
    }
  })
