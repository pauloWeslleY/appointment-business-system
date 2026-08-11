import { queryOptions } from '@tanstack/react-query'

import { getServiceEstablishmentDetailService } from '../services/service-establishment.service'
import { serviceEstablishmentQueryKeys } from './service-establishment-query-key'

export const serviceEstablishmentDetailQueryOptions = (serviceId: string) => {
  return queryOptions({
    queryKey: serviceEstablishmentQueryKeys.info(serviceId),
    queryFn: () => getServiceEstablishmentDetailService(serviceId),
    enabled: !!serviceId && serviceId.trim() !== '',
  })
}
