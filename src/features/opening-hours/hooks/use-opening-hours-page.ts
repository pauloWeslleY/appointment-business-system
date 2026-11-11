import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import type { EstablishmentOpeningHoursItemApiResponse } from '../types/opening-hours-response.api.type'
import { useEstablishmentOpeningHours } from './use-establishment-opening-hours'

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useOpeningHoursPage() {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const { data: session } = useAppSession()
  const {
    data: openingHoursData,
    error: openingHoursError,
    isLoading: isLoadingOpeningHours,
    refetch: refetchOpeningHours,
  } = useEstablishmentOpeningHours(establishment.id)
  const [editingOpeningHoursId, setEditingOpeningHoursId] = useState<string>()
  const [openingHoursToDelete, setOpeningHoursToDelete] =
    useState<EstablishmentOpeningHoursItemApiResponse | null>(null)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const establishmentId = establishment.id
  const openingHours = openingHoursData ?? []
  const openingHoursInEdition = openingHours.find(
    (item) => item.id === editingOpeningHoursId,
  )
  const openingHoursScopeKey = `${session?.user.id ?? ''}:${session?.session.activeOrganizationId ?? ''}:${establishment.id}`

  const onEditOpeningHours = (
    item: EstablishmentOpeningHoursItemApiResponse,
  ) => {
    setEditingOpeningHoursId(item.id)
  }

  const onCancelEditOpeningHours = () => {
    setEditingOpeningHoursId(undefined)
  }

  const onDeleteOpeningHours = (
    item: EstablishmentOpeningHoursItemApiResponse,
  ) => {
    setOpeningHoursToDelete(item)
    setDeleteDialogOpen(true)
  }

  const onDeleteDialogOpenChange = setDeleteDialogOpen

  const retryOpeningHours = () => refetchOpeningHours()

  return {
    establishmentId,
    openingHours,
    openingHoursInEdition,
    openingHoursToDelete,
    openingHoursError,
    isLoadingOpeningHours,
    retryOpeningHours,
    openingHoursScopeKey,
    isDeleteDialogOpen,
    onEditOpeningHours,
    onCancelEditOpeningHours,
    onDeleteOpeningHours,
    onDeleteDialogOpenChange,
  }
}
