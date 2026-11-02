import { queryOptions, skipToken } from '@tanstack/react-query'

import {
  getLegalEntityDocumentService,
  getLegalEntityItemService,
  getLegalEntityListService,
} from '../services/tax-information.service'
import type { QueryParamsListTaxInformationApiType } from '../types/tax-information-api-response.type'
import { taxInformationQueryKeys } from './tax-information.query-key'

export const taxInformationSummaryQueryOptions = (
  taxInformationId?: string,
) => {
  return queryOptions({
    queryKey: taxInformationQueryKeys.summary(taxInformationId),
    queryFn:
      taxInformationId !== undefined && taxInformationId.trim() !== ''
        ? () => getLegalEntityItemService(taxInformationId)
        : skipToken,
  })
}

export const taxInformationDocumentQueryOptions = (
  taxInformationId?: string,
) => {
  return queryOptions({
    queryKey: taxInformationQueryKeys.document(taxInformationId),
    queryFn:
      taxInformationId !== undefined && taxInformationId.trim() !== ''
        ? () => getLegalEntityDocumentService(taxInformationId)
        : skipToken,
  })
}

export const taxInformationListQueryOptions = (
  queryParams?: QueryParamsListTaxInformationApiType,
) => {
  return queryOptions({
    queryKey: taxInformationQueryKeys.list({
      ...queryParams,
    }),
    queryFn: () =>
      getLegalEntityListService({
        ...queryParams,
      }),
  })
}
