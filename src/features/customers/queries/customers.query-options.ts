import { queryOptions, skipToken } from '@tanstack/react-query'

import {
  getCustomerByIdService,
  getCustomersService,
} from '../services/customer.service'
import { customersQueryKeys } from './customers.query-key'

export function customersByEstablishmentQueryOptions(
  establishmentId?: string,
  userId?: string,
  organizationId?: string,
) {
  const hasContext = !!establishmentId && !!userId && !!organizationId
  return queryOptions({
    queryKey: customersQueryKeys.establishment(
      establishmentId,
      userId,
      organizationId,
    ),
    queryFn: hasContext
      ? () => getCustomersService(establishmentId)
      : skipToken,
  })
}

export function customerByIdQueryOptions(
  customerId?: string,
  userId?: string,
  organizationId?: string,
) {
  const hasContext = !!customerId && !!userId && !!organizationId
  return queryOptions({
    queryKey: customersQueryKeys.detail(customerId, userId, organizationId),
    queryFn: hasContext ? () => getCustomerByIdService(customerId) : skipToken,
  })
}
