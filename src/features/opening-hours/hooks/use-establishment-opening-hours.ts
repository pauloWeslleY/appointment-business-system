import { useQuery } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { establishmentOpeningHoursQueryOptions } from '../queries/opening-hours.query-options'

export function useEstablishmentOpeningHours(establishmentId: string) {
  const { data: session } = authClient.useSession()

  const scope = {
    userId: session?.user.id ?? '',
    organizationId: session?.session.activeOrganizationId ?? '',
  }

  return useQuery(establishmentOpeningHoursQueryOptions(scope, establishmentId))
}
