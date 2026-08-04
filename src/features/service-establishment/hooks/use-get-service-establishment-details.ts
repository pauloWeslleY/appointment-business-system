import { useQuery } from '@tanstack/react-query'

import { serviceEstablishmentQueryKeys } from '../queries/service-establishment-query-key'
import { getServiceEstablishmentDetailService } from '../services/service-establishment.service'

export function useGetServiceEstablishmentDetails(
  serviceEstablishmentId: string,
) {
  return useQuery({
    queryKey: serviceEstablishmentQueryKeys.info(serviceEstablishmentId),
    queryFn: () => getServiceEstablishmentDetailService(serviceEstablishmentId),
    enabled: serviceEstablishmentId.trim() !== '',
  })
}
