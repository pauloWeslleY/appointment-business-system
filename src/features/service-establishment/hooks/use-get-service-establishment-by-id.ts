import { useQuery } from '@tanstack/react-query'

import { getServiceEstablishmentByIdService } from '../services/service-establishment.service'
import { serviceEstablishmentQueryKeys } from '../queries/service-establishment-query-key'

export function useGetServiceEstablishmentById(serviceEstablishmentId: string) {
  return useQuery({
    queryKey: serviceEstablishmentQueryKeys.getById(serviceEstablishmentId),
    queryFn: () => getServiceEstablishmentByIdService(serviceEstablishmentId),
    enabled: serviceEstablishmentId.trim() !== '',
  })
}
