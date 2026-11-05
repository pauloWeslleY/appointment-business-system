import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'

import { establishmentByOrganizationQueryOptions } from '../queries/establishment.query-options'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

export function useGetEstablishmentsByOrganization(
  searchTerm?: string,
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
    establishmentByOrganizationQueryOptions(
      organizationProfile?.organizationId,
    ),
  )

  const errorGetEstablishments = errorOrganizationProfile ?? errorEstablishments
  const isLoadingGetEstablishments =
    isLoadingOrganizationProfile || isLoadingEstablishments

  const filteredEstablishments = useMemo<
    EstablishmentOrganizationProfileApiResponse[]
  >(() => {
    const normalizedSearchTerm = searchTerm?.toLowerCase() ?? ''

    const matchesSearchTerm = (text: string) =>
      text.toLowerCase().includes(normalizedSearchTerm)

    const matchesOpeningFilter = (
      establishment: EstablishmentOrganizationProfileApiResponse,
    ) => {
      if (!opening) {
        return true
      }

      const { establishmentOpen } =
        validateOpeningHoursEstablishment(establishment)

      return String(establishmentOpen) === opening
    }

    return establishments.filter((establishment) => {
      const matchesNameOrDescription =
        matchesSearchTerm(establishment.name) ||
        matchesSearchTerm(establishment.description)

      return matchesNameOrDescription && matchesOpeningFilter(establishment)
    })
  }, [establishments, searchTerm, opening])

  return {
    establishments,
    filteredEstablishments,
    errorGetEstablishments,
    isLoadingGetEstablishments,
  }
}
