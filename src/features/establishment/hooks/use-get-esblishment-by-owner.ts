import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useGetOwnerById } from '@/features/owner/hooks/use-get-owner-by-id'

import { establishmentQueryKeys } from '../queries/establishment-query-key'
import { getEstablishmentsByOwnerIdService } from '../services/establishment.service'

export function useGetEstablishmentsByOwner(searchParams?: string) {
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

  const filteredEstablishments = useMemo(() => {
    const filteredEstablishmentTitle = (establishmentName: string) =>
      establishmentName
        .toLowerCase()
        .includes(searchParams?.toLowerCase() ?? '')

    const filteredEstablishmentDescription = (establishmentName: string) =>
      establishmentName
        .toLowerCase()
        .includes(searchParams?.toLowerCase() ?? '')

    return establishments.filter(
      (establishment) =>
        filteredEstablishmentTitle(establishment.name) ||
        filteredEstablishmentDescription(establishment.description),
    )
  }, [establishments, searchParams])

  return {
    filteredEstablishments,
    establishments,
    errorEstablishments,
    isLoadingEstablishments,
  }
}
