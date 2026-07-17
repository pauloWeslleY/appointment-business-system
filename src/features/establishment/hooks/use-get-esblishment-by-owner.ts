import { useQuery } from '@tanstack/react-query'

import { useGetOwnerById } from '@/features/owner/hooks/use-get-owner-by-id'

import { getEstablishmentsByOwnerIdService } from '../api/establishment.service'
import { establishmentQueryKeys } from '../queries/establishment-query-key'

export function useGetEstablishmentsByOwner() {
  const { data: owner } = useGetOwnerById()

  const {
    data: establishments = [],
    error: errorEstablishments,
    isLoading: isLoadingEstablishments,
  } = useQuery({
    queryKey: establishmentQueryKeys.owner(owner?.id),
    queryFn: () => getEstablishmentsByOwnerIdService(owner?.id),
    enabled: !!owner?.id,
  })

  return {
    establishments,
    errorEstablishments,
    isLoadingEstablishments,
  }
}
