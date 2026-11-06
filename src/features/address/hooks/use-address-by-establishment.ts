import { useQuery } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { getAddressByEstablishmentQueryOptions } from '../queries/address.query-options'

export function useAddressByEstablishment(establishmentId?: string) {
  const { data: session } = authClient.useSession()

  const scope = {
    userId: session?.user.id ?? '',
    organizationId: session?.session.activeOrganizationId ?? '',
  }

  return useQuery(
    getAddressByEstablishmentQueryOptions(scope, {
      establishmentId: establishmentId ?? '',
    }),
  )
}
