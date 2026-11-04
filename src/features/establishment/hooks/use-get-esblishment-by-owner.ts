import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'

import { establishmentByOrganizationProfileQueryOptions } from '../queries/establishment.query-options'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

export function useGetEstablishmentsByOrganization(
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
  const errorGetEstablishments = errorOrganizationProfile ?? errorEstablishments
  const isLoadingGetEstablishments =
    isLoadingOrganizationProfile || isLoadingEstablishments

  const filteredEstablishments = useMemo<
    EstablishmentOrganizationProfileApiResponse[]
  >(() => {
    const filteredEstablishmentTitleAndDescription = (establishment: string) =>
      establishment.toLowerCase().includes(searchParams?.toLowerCase() ?? '')

    const filteredEstablishmentOpening = (
      establishment: EstablishmentOrganizationProfileApiResponse,
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
    establishments,
    filteredEstablishments,
    errorGetEstablishments,
    isLoadingGetEstablishments,
  }
}
