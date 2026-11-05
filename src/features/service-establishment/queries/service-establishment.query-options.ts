import { queryOptions, skipToken } from '@tanstack/react-query'

import {
  getServiceEstablishmentDetailService,
  getServicesByEstablishmentService,
} from '../services/service-establishment.service'
import { serviceEstablishmentQueryKeys } from './service-establishment.query-key'

export function serviceEstablishmentDetailQueryOptions(
  serviceId: string,
  organizationId?: string,
  userId?: string,
) {
  return queryOptions({
    queryKey: serviceEstablishmentQueryKeys.info(
      serviceId,
      organizationId,
      userId,
    ),
    queryFn:
      serviceId && organizationId && userId
        ? () => getServiceEstablishmentDetailService(serviceId)
        : skipToken,
  })
}

export function serviceEstablishmentListQueryOptions(
  establishmentId: string,
  organizationId?: string,
  userId?: string,
) {
  return queryOptions({
    queryKey: serviceEstablishmentQueryKeys.detail(
      establishmentId,
      organizationId,
      userId,
    ),
    queryFn:
      establishmentId && organizationId && userId
        ? () => getServicesByEstablishmentService(establishmentId)
        : skipToken,
  })
}
