import { queryOptions, skipToken } from '@tanstack/react-query'

import { getCustomerPageService } from '../services/customer-page.service'
import type { CustomerPageApiRequest } from '../types/customer-page-api.type'
import { customersQueryKeys } from './customers.query-key'

export function customerPageQueryOptions(
  input: CustomerPageApiRequest,
  userId?: string,
  organizationId?: string | null,
) {
  return queryOptions({
    queryKey: [
      ...customersQueryKeys.all(),
      'page',
      userId,
      organizationId,
      input,
    ],
    queryFn:
      userId && organizationId
        ? ({ signal }) => getCustomerPageService(input, signal)
        : skipToken,
  })
}
