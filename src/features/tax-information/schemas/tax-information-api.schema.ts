import z from 'zod'

import { TAX_ID_TYPES } from '../types/tax-id.type'
import { LEGAL_ENTITY_STATUSES } from '../types/tax-information-status.type'

export const LegalEntityListItemApiResponseSchema = z.object({
  id: z.uuid('UUID Inválido'),
  organizationId: z.string().trim().min(1, 'ID da organização obrigatório'),
  legalName: z.string().trim().min(1, 'Razão social obrigatório'),
  tradeName: z.string().trim().min(1, 'Nome fantasia obrigatório'),
  maskedTaxId: z.string().trim().min(1, 'CPF/CNPJ mascarado obrigatório'),
  taxIdType: z.enum(TAX_ID_TYPES, {
    error: (issue) =>
      issue.input === undefined ? 'Campo obrigatório' : 'Dado inválido',
  }),
  status: z.enum(LEGAL_ENTITY_STATUSES, {
    error: (issue) =>
      issue.input === undefined ? 'Campo obrigatório' : 'Dado inválido',
  }),
  createdAt: z.iso.datetime('Data de criação inválida'),
  updatedAt: z.iso.datetime('Data de atualização inválida'),
})

export const LegalEntityListApiResponseSchema = z.object({
  legalEntities: z.array(LegalEntityListItemApiResponseSchema),
  nextCursor: z
    .uuid('Cursor inválido')
    .trim()
    .min(1, 'Cursor obrigatório')
    .nullable(),
})
