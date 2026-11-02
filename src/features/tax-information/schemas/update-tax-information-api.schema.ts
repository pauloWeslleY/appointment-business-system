import z from 'zod'

import { LEGAL_ENTITY_STATUSES } from '../types/tax-information-status.type'
import { LegalEntityListItemApiResponseSchema } from './tax-information-api.schema'

export const UpdateTaxInformationApiRequestSchema = z.object({
  legalEntityId: z.string().trim().min(1, 'Campo obrigatório'),
  legalName: z.string().trim().min(1, 'Campo obrigatório'),
  tradeName: z.string().trim().min(1, 'Campo obrigatório'),
  status: z.enum(LEGAL_ENTITY_STATUSES, {
    error: (issue) =>
      issue.input === undefined ? 'Campo obrigatório' : 'Dado inválido',
  }),
})

export const UpdateTaxInformationFormSchema = z.object({
  ...UpdateTaxInformationApiRequestSchema.omit({
    status: true,
    legalEntityId: true,
  }).shape,
  status: z
    .array(
      z.enum(LEGAL_ENTITY_STATUSES, {
        error: (issue) =>
          issue.input === undefined ? 'Campo obrigatório' : 'Dado inválido',
      }),
    )
    .min(1, 'Campo obrigatório'),
})

export const UpdateTaxInformationApiResponseSchema = z.object({
  legalEntity: LegalEntityListItemApiResponseSchema,
})
