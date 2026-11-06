import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'

import { useAddressByEstablishment } from './use-address-by-establishment'

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useAddressPage() {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const addressQuery = useAddressByEstablishment(establishment.id)
  const [isEditingAddress, setEditingAddress] = useState(false)

  const address = addressQuery.data ?? null
  const hasAddress = address !== null
  const addressInEdition = isEditingAddress ? address : null

  const onEditAddress = () => {
    setEditingAddress(true)
  }

  const onCancelEditAddress = () => {
    setEditingAddress(false)
  }

  return {
    establishmentId: establishment.id,
    addressQuery,
    address,
    hasAddress,
    addressInEdition,
    onEditAddress,
    onCancelEditAddress,
  }
}
