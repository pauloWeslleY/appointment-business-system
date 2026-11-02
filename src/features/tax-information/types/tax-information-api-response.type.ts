import type z from 'zod'

import type { QueryParamsListTaxInformationApiSchema } from '../schemas/query-params-list-tax-information.api.schema'
import type {
  LegalEntityListApiResponseSchema,
  LegalEntityListItemApiResponseSchema,
} from '../schemas/tax-information-api.schema'
import type {
  TaxInformationDetailsApiResponseSchema,
  TaxInformationDocumentApiResponseSchema,
} from '../schemas/tax-information-details.api.schema'

export type LegalEntityListApiResponseType = z.infer<
  typeof LegalEntityListApiResponseSchema
>

export type LegalEntityListItemApiResponseType = z.infer<
  typeof LegalEntityListItemApiResponseSchema
>

export type TaxInformationDetailsApiResponseType = z.infer<
  typeof TaxInformationDetailsApiResponseSchema
>

export type TaxInformationDocumentApiResponseType = z.infer<
  typeof TaxInformationDocumentApiResponseSchema
>

export type QueryParamsListTaxInformationApiType = z.infer<
  typeof QueryParamsListTaxInformationApiSchema
>
