import { useQuery } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { serviceEstablishmentDetailQueryOptions } from '../queries/service-establishment.query-options'

export function useGetServiceEstablishmentById(serviceEstablishmentId: string) {
  const { data: session } = authClient.useSession()
  return useQuery(
    serviceEstablishmentDetailQueryOptions(
      serviceEstablishmentId,
      session?.session.activeOrganizationId ?? undefined,
      session?.user.id,
    ),
  )
}
