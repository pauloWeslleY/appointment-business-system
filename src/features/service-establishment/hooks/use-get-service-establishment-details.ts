import { useQuery } from '@tanstack/react-query'

import { getServiceEstablishmentDetailService } from '../services/service-establishment.service'
import { serviceEstablishmentQueryKeys } from '../queries/service-establishment-query-key'

export function useGetServiceEstablishmentDetails(
  serviceEstablishmentId: string,
) {
  return useQuery({
    queryKey: serviceEstablishmentQueryKeys.info(serviceEstablishmentId),
    queryFn: () => getServiceEstablishmentDetailService(serviceEstablishmentId),
    enabled: serviceEstablishmentId.trim() !== '',
  })
}
