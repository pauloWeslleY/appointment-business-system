import { useQuery } from '@tanstack/react-query'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { establishmentOpeningHoursQueryOptions } from '../queries/opening-hours.query-options'

export function useEstablishmentOpeningHours(establishmentId: string) {
  const { data: session } = useAppSession()

  const scope = {
    userId: session?.user.id ?? '',
    organizationId: session?.session.activeOrganizationId ?? '',
  }

  return useQuery(establishmentOpeningHoursQueryOptions(scope, establishmentId))
}
