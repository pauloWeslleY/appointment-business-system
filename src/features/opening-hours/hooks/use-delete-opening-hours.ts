import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { weekDaysLabels } from '@/shared/utils/create-list-weekdays'

import { openingHoursMutationOptions } from '../queries/opening-hours.mutation-options'
import { getOpeningHoursByIdQueryOptions } from '../queries/opening-hours.query-options'

export function useDeleteOpeningHours(
  openingHourIdToDelete: string,
  onDeleted: () => void,
) {
  const { data: session } = useAppSession()
  const { mutate: deleteOpeningHours, isPending: isPendingDeleteOpeningHours } =
    useMutation(openingHoursMutationOptions.delete())
  const {
    data: openingHoursDataSummary,
    error: openingHoursErrorSummary,
    isLoading: isLoadingOpeningHoursSummary,
  } = useQuery({
    ...getOpeningHoursByIdQueryOptions(
      {
        userId: session?.user.id ?? '',
        organizationId: session?.session.activeOrganizationId ?? '',
      },
      openingHourIdToDelete,
    ),
    select: (data) => ({
      establishmentId: data.establishmentId,
      day: data.dayOfWeek,
      open: data.openTime,
      close: data.closeTime,
    }),
  })

  const openingHourDetails = useMemo(() => {
    if (!openingHoursDataSummary) {
      return 'N/A'
    }

    const openingHoursDayLabel = weekDaysLabels[openingHoursDataSummary.day]
    const openingHoursTimeRange = `${openingHoursDataSummary.open} - ${openingHoursDataSummary.close}`
    return `${openingHoursDayLabel} · ${openingHoursTimeRange}`
  }, [openingHoursDataSummary])

  const handleDeleteOpeningHours = (openingHoursId: string) => {
    if (openingHoursId.trim() === '' || !openingHoursDataSummary) {
      toaster.error({
        title: 'Erro ao excluir horário de funcionamento',
        description: 'Horário de funcionamento não encontrado',
      })
      return
    }

    deleteOpeningHours(
      {
        id: openingHoursId,
        establishmentId: openingHoursDataSummary.establishmentId,
      },
      {
        onSuccess: () => {
          toaster.success({
            title: 'Horário de funcionamento excluído com sucesso',
          })

          onDeleted()
        },
        onError: (error) => {
          toaster.error({
            title: 'Erro ao excluir horário de funcionamento',
            description: error.message || 'Ocorreu um erro inesperado',
          })
        },
      },
    )
  }

  return {
    openingHourDetails,
    openingHoursErrorSummary,
    isLoadingOpeningHoursSummary,
    isPendingDeleteOpeningHours,
    handleDeleteOpeningHours,
  }
}
