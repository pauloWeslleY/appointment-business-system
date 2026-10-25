import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'

import { establishmentByOrganizationProfileQueryOptions } from '../queries/establishment-query-options'
import type { EstablishmentModel } from '../types/establishment.model'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

export function useGetEstablishmentsByOwner(
  searchParams?: string,
  opening?: string,
) {
  const {
    data: organizationProfile,
    error: errorOrganizationProfile,
    isLoading: isLoadingOrganizationProfile,
  } = useQuery(organizationProfileSummaryQueryOptions())
  const {
    data: establishments = [],
    error: errorEstablishments,
    isLoading: isLoadingEstablishments,
  } = useQuery(
    establishmentByOrganizationProfileQueryOptions(organizationProfile?.id),
  )

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
    errorEstablishments: errorOrganizationProfile ?? errorEstablishments,
    isLoadingEstablishments:
      isLoadingOrganizationProfile || isLoadingEstablishments,
  }
}
