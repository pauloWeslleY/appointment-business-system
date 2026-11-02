import type { QueryParamsListTaxInformationApiType } from '../types/tax-information-api-response.type'

export const taxInformationQueryKeys = {
  all: ['tax-information'] as const,

  document: (id?: string) =>
    [...taxInformationQueryKeys.all, 'document', id] as const,

  summary: (id?: string) =>
    [...taxInformationQueryKeys.all, 'summary', id] as const,

  list: (queryString: Partial<QueryParamsListTaxInformationApiType>) =>
    [
      ...taxInformationQueryKeys.all,
      'list',
      {
        limit: queryString.limit || null,
        cursor: queryString.cursor || null,
      },
    ] as const,
} as const
