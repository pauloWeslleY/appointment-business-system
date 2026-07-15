import { useQuery } from '@tanstack/react-query'

import { establishmentQueryKeys } from '../constants/establishment.query-key'
import { getEstablishmentByIdService } from '../services/establishment/establishment.service'

const useGetEstablishmentById = (establishmentId: string) => {
  return useQuery({
    queryKey: establishmentQueryKeys.detail(establishmentId),
    queryFn: () => getEstablishmentByIdService(establishmentId),
    enabled: establishmentId.trim() !== '',
  })
}

export default useGetEstablishmentById
