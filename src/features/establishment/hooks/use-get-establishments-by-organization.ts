import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { establishmentByOrganizationQueryOptions } from '../queries/establishment.query-options'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

export function useGetEstablishmentsByOrganization(
  searchTerm?: string,
  opening?: string,
  status?: string,
) {
  const { data: session, error: sessionError, isPending } = useAppSession()
  const {
    data: establishments = [],
    error: errorEstablishments,
    isLoading: isLoadingEstablishments,
  } = useQuery(
    establishmentByOrganizationQueryOptions(
      session?.session.activeOrganizationId ?? undefined,
    ),
  )

  const errorGetEstablishments = sessionError ?? errorEstablishments
  const isLoadingGetEstablishments = isPending || isLoadingEstablishments

  console.log(status)

  const filteredEstablishments = useMemo<
    EstablishmentOrganizationProfileApiResponse[]
  >(() => {
    const matchesSearchTerm = (text: string) =>
      text.toLowerCase().includes(searchTerm?.toLowerCase() ?? '')

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

    const matchesStatusFilter = new Set(status?.split(',') ?? [])

    return establishments.filter((establishment) => {
      const matchesNameOrDescription =
        matchesSearchTerm(establishment.name) ||
        matchesSearchTerm(establishment.description)

      const matchesStatus =
        !status || matchesStatusFilter.has(establishment.status)
      const matchesOpening = matchesOpeningFilter(establishment)

      return matchesNameOrDescription && matchesOpening && matchesStatus
    })
  }, [establishments, searchTerm, opening, status])

  return {
    establishments,
    filteredEstablishments,
    errorGetEstablishments,
    isLoadingGetEstablishments,
  }
}
