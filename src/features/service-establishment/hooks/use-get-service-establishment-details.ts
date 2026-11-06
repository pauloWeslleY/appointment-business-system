import { useQuery } from '@tanstack/react-query'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { serviceEstablishmentDetailQueryOptions } from '../queries/service-establishment.query-options'

export function useGetServiceEstablishmentDetails(
  serviceEstablishmentId: string,
) {
  const { data: session } = useAppSession()
  return useQuery(
    serviceEstablishmentDetailQueryOptions(
      serviceEstablishmentId,
      session?.session.activeOrganizationId ?? undefined,
      session?.user.id,
    ),
  )
}
