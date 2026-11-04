import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useRouteContext } from '@tanstack/react-router'

import { getAddressByEstablishmentQueryOptions } from '@/features/address/queries/address.query-options'

import { establishmentAdminSlugQueryOptions } from '../queries/establishment.query-options'

export function useEstablishmentAddress() {
  const { memberContext } = useRouteContext({ from: '/_authenticated' })
  const { establishmentSlug } = useParams({
    from: '/_authenticated/establishment/_routes/$establishmentSlug/',
  })

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
        userId: memberContext.user.id,
        organizationId: memberContext.organization.id,
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
