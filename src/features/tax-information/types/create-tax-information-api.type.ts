import type z from 'zod'

import type {
  CreateTaxInformationApiRequestSchema,
  CreateTaxInformationApiResponseSchema,
  CreateTaxInformationFormSchema,
} from '../schemas/create-tax-information-api.schema'

export type CreateTaxInformationApiRequestType = z.infer<
  typeof CreateTaxInformationApiRequestSchema
>

export type CreateTaxInformationFormType = z.infer<
  typeof CreateTaxInformationFormSchema
>

export type CreateTaxInformationApiResponseType = z.infer<
  typeof CreateTaxInformationApiResponseSchema
>
