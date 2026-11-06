import { useQuery } from '@tanstack/react-query'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { getAddressByEstablishmentQueryOptions } from '../queries/address.query-options'

export function useAddressByEstablishment(establishmentId?: string) {
  const { data: session } = useAppSession()

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
