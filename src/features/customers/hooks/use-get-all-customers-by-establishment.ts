import { useQuery } from '@tanstack/react-query'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { customersByEstablishmentQueryOptions } from '../queries/customers.query-options'

export function useGetAllCustomersByEstablishment(establishmentId?: string) {
  const { data: session } = useAppSession()
  return useQuery(
    customersByEstablishmentQueryOptions(
      establishmentId,
      session?.user.id,
      session?.session.activeOrganizationId ?? undefined,
    ),
  )
}
