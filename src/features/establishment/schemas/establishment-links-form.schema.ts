import { z } from 'zod'

import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from '@/shared/constants/files-config'

import { PaymentHttpsUrlSchema } from './establishment-settings.schema'
import { EstablishmentSocialLinksFormSchema } from './establishment-social-links.schema'
import { EstablishmentWebsiteUrlFormSchema } from './establishment-website-url.schema'

const OptionalPaymentUrlFormSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === '' || PaymentHttpsUrlSchema.safeParse(value).success,
    'Informe uma URL HTTPS válida com até 2048 caracteres.',
  )

const QrCodeImageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_IMAGE_SIZE, 'A imagem deve ter até 5 MB.')
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.some((type) => type === file.type),
    'Use uma imagem PNG, JPG ou WebP.',
  )
  .nullable()

export const EstablishmentLinksFormSchema = z
  .object({
    websiteUrl: EstablishmentWebsiteUrlFormSchema,
    ...EstablishmentSocialLinksFormSchema.shape,
    requiresBookingDeposit: z.boolean(),
    paymentLink: OptionalPaymentUrlFormSchema,
    paymentQrCodeUrl: OptionalPaymentUrlFormSchema,
    qrCodeFile: QrCodeImageFileSchema,
  })
  .superRefine((data, ctx) => {
    if (data.requiresBookingDeposit && !data.paymentLink) {
      ctx.addIssue({
        code: 'custom',
        path: ['paymentLink'],
        message: 'Informe o link de pagamento para exigir sinal.',
      })
    }

    const hasPaymentQrCode = Boolean(data.paymentQrCodeUrl || data.qrCodeFile)

    if (data.requiresBookingDeposit && !hasPaymentQrCode) {
      ctx.addIssue({
        code: 'custom',
        path: ['paymentQrCodeUrl'],
        message: 'Informe a URL, envie uma imagem ou gere o QR Code do link.',
      })
    }
  })
