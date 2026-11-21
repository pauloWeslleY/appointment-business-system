import { useBreakpointValue } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useReducedMotion } from 'motion/react'
import { parseAsBoolean, parseAsString, useQueryStates } from 'nuqs'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { listOpeningHoursEstablishmentQueryOptions } from '../queries/opening-hours.query-options'
import type { EstablishmentOpeningHoursItemApiResponse } from '../types/opening-hours-response.api.type'

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useOpeningHoursPage() {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const { data: session } = useAppSession()
  const isDesktopOpeningHoursLayout = useBreakpointValue({
    base: false,
    lg: true,
  })
  const shouldReduceOpeningHoursMotion = useReducedMotion()
  const {
    data: openingHoursData,
    error: openingHoursError,
    isLoading: isLoadingOpeningHours,
    refetch: refetchOpeningHours,
  } = useQuery(
    listOpeningHoursEstablishmentQueryOptions(
      {
        userId: session?.user.id ?? '',
        organizationId: session?.session.activeOrganizationId ?? '',
      },
      establishment.id,
    ),
  )
  const [
    {
      is_open_dialog_delete: isDeleteDialogOpen,
      hour_edition: hourSelectedEdition,
      hour_to_delete: openingHourIdToDelete,
    },
    setSearchParamsOpeningHours,
  ] = useQueryStates(
    {
      is_open_dialog_delete: parseAsBoolean.withDefault(false),
      hour_edition: parseAsString.withDefault(''),
      hour_to_delete: parseAsString.withDefault(''),
    },
    {
      shallow: false,
    },
  )

  const establishmentId = establishment.id
  const openingHours = openingHoursData ?? []
  const openingHoursScopeKey = `${session?.user.id ?? ''}:${session?.session.activeOrganizationId ?? ''}:${establishment.id}`

  const hasReachedOpeningHoursLimit = openingHours.length >= 7
  const isEditingOpeningHours = hourSelectedEdition.trim() !== ''
  const showOpeningHoursLimitAlert =
    hasReachedOpeningHoursLimit && !isEditingOpeningHours
  const showFormCreateOpeningHour =
    !hasReachedOpeningHoursLimit && !isEditingOpeningHours
  const showOpeningHoursForm =
    isEditingOpeningHours || showFormCreateOpeningHour
  const desktopOpeningHoursFormWidth = showOpeningHoursForm ? '60%' : '0%'
  const openingHoursFormWidth = isDesktopOpeningHoursLayout
    ? desktopOpeningHoursFormWidth
    : '100%'
  const openingHoursMotionDuration = shouldReduceOpeningHoursMotion ? 0 : 0.4

  const hasOpeningHours = openingHours.length > 0
  const hasNoOpeningHours =
    !isLoadingOpeningHours && !openingHoursError && !hasOpeningHours

  const onEditOpeningHours = (
    item: EstablishmentOpeningHoursItemApiResponse,
  ) => {
    setSearchParamsOpeningHours((prevState) => ({
      ...prevState,
      hour_edition: item.id,
    }))
  }

  const onCancelEditOpeningHours = () => {
    setSearchParamsOpeningHours((prevState) => ({
      ...prevState,
      hour_edition: '',
    }))
  }

  const onDeleteOpeningHours = (
    item: EstablishmentOpeningHoursItemApiResponse,
  ) => {
    setSearchParamsOpeningHours((prevState) => ({
      ...prevState,
      is_open_dialog_delete: true,
      hour_to_delete: item.id,
    }))
  }

  const onDeleteDialogOpenChange = (isOpen: boolean) => {
    setSearchParamsOpeningHours((prevState) => ({
      ...prevState,
      ...(!isOpen && { hour_to_delete: '' }),
      is_open_dialog_delete: isOpen,
    }))
  }

  const retryOpeningHours = () => refetchOpeningHours()

  return {
    establishmentId,
    openingHours,
    openingHoursError,
    openingHourIdToDelete,
    openingHoursScopeKey,
    isLoadingOpeningHours,
    isDeleteDialogOpen,
    hasOpeningHours,
    hasNoOpeningHours,
    hourSelectedEdition,
    isEditingOpeningHours,
    showOpeningHoursLimitAlert,
    showFormCreateOpeningHour,
    showOpeningHoursForm,
    openingHoursFormWidth,
    openingHoursMotionDuration,
    shouldReduceOpeningHoursMotion,
    onEditOpeningHours,
    onCancelEditOpeningHours,
    onDeleteOpeningHours,
    onDeleteDialogOpenChange,
    retryOpeningHours,
  }
}
