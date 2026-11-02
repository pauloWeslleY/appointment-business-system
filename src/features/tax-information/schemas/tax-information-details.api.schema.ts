import z from 'zod'

import { LegalEntityListItemApiResponseSchema } from './tax-information-api.schema'

export const TaxInformationDetailsApiResponseSchema = z.object({
  ...LegalEntityListItemApiResponseSchema.omit({ maskedTaxId: true }).shape,
  taxId: z.string().trim().min(1, 'ID tributário obrigatório'),
})

export const TaxInformationDocumentApiResponseSchema = z.object({
  legalEntity: TaxInformationDetailsApiResponseSchema,
})
