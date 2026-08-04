import { useQuery } from '@tanstack/react-query'

import { serviceEstablishmentQueryKeys } from '../queries/service-establishment-query-key'
import { getServiceEstablishmentByIdService } from '../services/service-establishment.service'

export function useGetServiceEstablishmentById(serviceEstablishmentId: string) {
  return useQuery({
    queryKey: serviceEstablishmentQueryKeys.getById(serviceEstablishmentId),
    queryFn: () => getServiceEstablishmentByIdService(serviceEstablishmentId),
    enabled: serviceEstablishmentId.trim() !== '',
  })
}
