import { useQuery } from '@tanstack/react-query'

import { getAddressByEstablishmentQueryOptions } from '@/features/address/queries/address.query-options'
import type { GetMeContextResponse } from '@/features/members/types/member-response.type'

import { establishmentAdminSlugQueryOptions } from '../queries/establishment.query-options'

export function useEstablishmentAddress(
  establishmentSlug: string,
  member: Pick<GetMeContextResponse, 'user' | 'organization'>,
) {
  const {
    data: establishment,
    error: errorEstablishment,
    isPending: isLoadingEstablishment,
    refetch,
  } = useQuery(establishmentAdminSlugQueryOptions(establishmentSlug))

  const {
    data: address,
    error: errorAddress,
    isPending: isLoadingAddress,
    refetch: refetchAddress,
  } = useQuery(
    getAddressByEstablishmentQueryOptions(
      {
        userId: member.user.id,
        organizationId: member.organization.id,
      },
      { establishmentId: establishment?.id || '' },
    ),
  )

  const isLoading = isLoadingEstablishment || isLoadingAddress

  const retryEstablishment = () => refetch()
  const retryAddress = () => refetchAddress()

  return {
    establishment,
    errorEstablishment,
    errorAddress,
    address,
    isLoading,
    retryAddress,
    retryEstablishment,
  }
}
