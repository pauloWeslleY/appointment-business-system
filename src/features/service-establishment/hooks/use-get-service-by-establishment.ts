import { useQuery } from '@tanstack/react-query'

import { getServicesByEstablishmentService } from '../services/service-establishment.service'
import { serviceEstablishmentQueryKeys } from '../queries/service-establishment-query-key'

export const useGetServiceByEstablishment = (establishmentId: string) => {
  return useQuery({
    queryKey: serviceEstablishmentQueryKeys.detail(establishmentId),
    queryFn: () => getServicesByEstablishmentService(establishmentId),
    enabled: establishmentId.trim() !== '',
  })
}
