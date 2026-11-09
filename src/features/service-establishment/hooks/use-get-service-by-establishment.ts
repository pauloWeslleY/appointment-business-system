import { useQuery } from '@tanstack/react-query'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { serviceEstablishmentListQueryOptions } from '../queries/service-establishment.query-options'

export function useGetServiceByEstablishment(
  establishmentId: string,
  enabled = true,
) {
  const { data: session } = useAppSession()
  return useQuery({
    ...serviceEstablishmentListQueryOptions(
      establishmentId,
      session?.session.activeOrganizationId ?? undefined,
      session?.user.id,
    ),
    enabled,
  })
}
