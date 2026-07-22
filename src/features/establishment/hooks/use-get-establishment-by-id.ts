import { useQuery } from '@tanstack/react-query'

import { getEstablishmentByIdService } from '../services/establishment.service'
import { establishmentQueryKeys } from '../queries/establishment-query-key'

const useGetEstablishmentById = (establishmentId: string) => {
  return useQuery({
    queryKey: establishmentQueryKeys.detail(establishmentId),
    queryFn: () => getEstablishmentByIdService(establishmentId),
    enabled: establishmentId.trim() !== '',
  })
}

export default useGetEstablishmentById
