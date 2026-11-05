import { useQuery } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { customersByEstablishmentQueryOptions } from '../queries/customers.query-options'

export function useGetAllCustomersByEstablishment(establishmentId?: string) {
  const { data: session } = authClient.useSession()
  return useQuery(
    customersByEstablishmentQueryOptions(
      establishmentId,
      session?.user.id,
      session?.session.activeOrganizationId ?? undefined,
    ),
  )
}
