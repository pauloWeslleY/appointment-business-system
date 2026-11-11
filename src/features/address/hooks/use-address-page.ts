import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { useAddressByEstablishment } from './use-address-by-establishment'

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useAddressPage() {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const { data: session } = useAppSession()
  const {
    data: addressData,
    error: addressError,
    isLoading: isLoadingAddress,
    refetch: refetchAddress,
  } = useAddressByEstablishment(establishment.id)
  const [isEditingAddress, setEditingAddress] = useState(false)

  const establishmentId = establishment.id
  const address = addressData ?? null
  const hasAddress = address !== null
  const addressInEdition = isEditingAddress ? address : null
  const addressScopeKey = `${session?.user.id ?? ''}:${session?.session.activeOrganizationId ?? ''}:${establishment.id}`

  const onEditAddress = () => {
    setEditingAddress(true)
  }

  const onCancelEditAddress = () => {
    setEditingAddress(false)
  }

  const retryAddress = () => refetchAddress()

  return {
    establishmentId,
    address,
    hasAddress,
    addressInEdition,
    addressError,
    isLoadingAddress,
    retryAddress,
    addressScopeKey,
    onEditAddress,
    onCancelEditAddress,
  }
}
