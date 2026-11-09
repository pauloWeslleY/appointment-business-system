import { queryOptions, skipToken } from '@tanstack/react-query'

import { getServicePageService } from '../services/service-page.service'
import type { ServicePageApiRequest } from '../types/service-page-api.type'
import { serviceEstablishmentQueryKeys } from './service-establishment.query-key'

export function servicePageQueryOptions(
  input: ServicePageApiRequest,
  userId?: string,
  organizationId?: string | null,
) {
  return queryOptions({
    queryKey: [
      ...serviceEstablishmentQueryKeys.lists(),
      'page',
      userId,
      organizationId,
      input,
    ],
    queryFn:
      userId && organizationId
        ? ({ signal }) => getServicePageService(input, signal)
        : skipToken,
  })
}
