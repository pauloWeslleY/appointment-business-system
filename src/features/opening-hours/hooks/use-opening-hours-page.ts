import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'

import type { EstablishmentOpeningHoursItemApiResponse } from '../types/opening-hours-response.api.type'
import { useEstablishmentOpeningHours } from './use-establishment-opening-hours'

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

export function useOpeningHoursPage() {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const openingHoursQuery = useEstablishmentOpeningHours(establishment.id)
  const [editingOpeningHoursId, setEditingOpeningHoursId] = useState<string>()
  const [openingHoursToDelete, setOpeningHoursToDelete] =
    useState<EstablishmentOpeningHoursItemApiResponse | null>(null)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const openingHours = openingHoursQuery.data ?? []
  const openingHoursInEdition = openingHours.find(
    (item) => item.id === editingOpeningHoursId,
  )

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

  return {
    establishmentId: establishment.id,
    openingHoursQuery,
    openingHours,
    openingHoursInEdition,
    openingHoursToDelete,
    isDeleteDialogOpen,
    onEditOpeningHours,
    onCancelEditOpeningHours,
    onDeleteOpeningHours,
    onDeleteDialogOpenChange: setDeleteDialogOpen,
  }
}
