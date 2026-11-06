import { z } from 'zod'

const SOCIAL_LINK_MAX_LENGTH = 2048

// WhatsApp comercial com DDD e celular de nove dígitos, sem formatação.
const WHATSAPP_CELLPHONE_DIGITS = /^\d{11}$/

export const EstablishmentSocialLinkUrlSchema = z
  .url({ protocol: /^https$/, error: 'Informe uma URL HTTPS válida.' })
  .max(
    SOCIAL_LINK_MAX_LENGTH,
    `Use no máximo ${SOCIAL_LINK_MAX_LENGTH} caracteres.`,
  )

export const EstablishmentSocialLinksSchema = z.object({
  instagram: EstablishmentSocialLinkUrlSchema.nullable(),
  facebook: EstablishmentSocialLinkUrlSchema.nullable(),
  whatsapp: z.string().nullable(),
})

function createOptionalSocialLinkUrlFormSchema(socialNetworkName: string) {
  return z
    .string()
    .trim()
    .refine(
      (value) =>
        value === '' ||
        EstablishmentSocialLinkUrlSchema.safeParse(value).success,
      `Informe uma URL HTTPS do ${socialNetworkName} com até ${SOCIAL_LINK_MAX_LENGTH} caracteres.`,
    )
}

export const EstablishmentSocialLinksFormSchema = z.object({
  instagram: createOptionalSocialLinkUrlFormSchema('Instagram'),
  facebook: createOptionalSocialLinkUrlFormSchema('Facebook'),
  whatsapp: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || WHATSAPP_CELLPHONE_DIGITS.test(value),
      'Informe o WhatsApp com DDD, como (11) 99999-9999.',
    ),
})
