import z from 'zod'

import { validateCNPJ } from '@/shared/helpers/validate-cnpj'
import { validateCPF } from '@/shared/helpers/validate-cpf'

import { TAX_ID_TYPES } from '../types/tax-id.type'
import { LegalEntityListItemApiResponseSchema } from './tax-information-api.schema'

export const CreateTaxInformationApiRequestSchema = z.object({
  legalName: z.string().trim().min(1, 'Campo obrigatório'),
  tradeName: z.string().trim().min(1, 'Campo obrigatório'),
  taxId: z.string().trim().min(1, 'Campo obrigatório'),
  taxIdType: z.enum(TAX_ID_TYPES, {
    error: (issue) =>
      issue.input === undefined ? 'Campo obrigatório' : 'Dado inválido',
  }),
})

export const CreateTaxInformationFormSchema = z
  .object({
    ...CreateTaxInformationApiRequestSchema.omit({ taxIdType: true }).shape,
    taxIdType: z.array(z.enum(TAX_ID_TYPES)).min(1, 'Campo obrigatório'),
  })
  .refine(
    (data) => {
      if (data.taxIdType.includes('CNPJ')) {
        return validateCNPJ(data.taxId)
      }

      return true
    },
    {
      message: 'CNPJ inválido',
      path: ['taxId'],
    },
  )
  .refine(
    (data) => {
      if (data.taxIdType.includes('CPF')) {
        return validateCPF(data.taxId)
      }

      return true
    },
    {
      message: 'CPF inválido',
      path: ['taxId'],
    },
  )

export const CreateTaxInformationApiResponseSchema = z.object({
  legalEntity: LegalEntityListItemApiResponseSchema,
})
