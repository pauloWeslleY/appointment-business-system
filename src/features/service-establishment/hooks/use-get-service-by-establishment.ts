import { useQuery } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { serviceEstablishmentListQueryOptions } from '../queries/service-establishment.query-options'

export function useGetServiceByEstablishment(establishmentId: string) {
  const { data: session } = authClient.useSession()
  return useQuery(
    serviceEstablishmentListQueryOptions(
      establishmentId,
      session?.session.activeOrganizationId ?? undefined,
      session?.user.id,
    ),
  )
}
