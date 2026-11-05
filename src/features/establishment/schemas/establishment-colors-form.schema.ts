import { z } from 'zod'

import { EstablishmentHexColorSchema } from './establishment-settings.schema'

const OptionalEstablishmentColorFormSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === '' || EstablishmentHexColorSchema.safeParse(value).success,
    'Use uma cor hexadecimal com seis dígitos.',
  )

export const EstablishmentColorsFormSchema = z.object({
  primaryColor: OptionalEstablishmentColorFormSchema,
  secondaryColor: OptionalEstablishmentColorFormSchema,
  tertiaryColor: OptionalEstablishmentColorFormSchema,
})
