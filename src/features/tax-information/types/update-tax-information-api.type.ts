import type z from 'zod'

import type {
  UpdateTaxInformationApiRequestSchema,
  UpdateTaxInformationApiResponseSchema,
  UpdateTaxInformationFormSchema,
} from '../schemas/update-tax-information-api.schema'

export type UpdateTaxInformationApiRequestType = z.infer<
  typeof UpdateTaxInformationApiRequestSchema
>

export type UpdateTaxInformationFormType = z.infer<
  typeof UpdateTaxInformationFormSchema
>

export type UpdateTaxInformationApiResponseType = z.infer<
  typeof UpdateTaxInformationApiResponseSchema
>
