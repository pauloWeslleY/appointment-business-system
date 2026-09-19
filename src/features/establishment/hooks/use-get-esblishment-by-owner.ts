import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useGetOwnerById } from '@/features/owner/hooks/use-get-owner-by-id'

import { establishmentQueryKeys } from '../queries/establishment-query-key'
import { getEstablishmentsByOwnerIdService } from '../services/establishment.service'
import type { EstablishmentModel } from '../types/establishment.model'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

export function useGetEstablishmentsByOwner(
  searchParams?: string,
  opening?: string,
) {
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

  const filteredEstablishments = useMemo<EstablishmentModel[]>(() => {
    const filteredEstablishmentTitleAndDescription = (establishment: string) =>
      establishment.toLowerCase().includes(searchParams?.toLowerCase() ?? '')

    const filteredEstablishmentOpening = (
      establishment: EstablishmentModel,
    ) => {
      const getEstablishment = validateOpeningHoursEstablishment(establishment)
      const isEstablishmentOpen = getEstablishment.establishmentOpen
        ? 'true'
        : 'false'
      return opening ? isEstablishmentOpen === opening : true
    }

    return establishments.filter((establishment) => {
      const filteredTitleAndDescription =
        filteredEstablishmentTitleAndDescription(establishment.name) ||
        filteredEstablishmentTitleAndDescription(establishment.description)

      return (
        filteredTitleAndDescription &&
        filteredEstablishmentOpening(establishment)
      )
    })
  }, [establishments, searchParams, opening])

  return {
    filteredEstablishments,
    establishments,
    errorEstablishments,
    isLoadingEstablishments,
  }
}
