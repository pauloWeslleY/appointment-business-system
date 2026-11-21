import type { PaginationPageChangeDetails } from '@chakra-ui/react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useTransition } from 'react'

import type { EstablishmentSlugApiResponse } from '@/features/establishment/types/get-establishment-api.response.type'

import { groupAppointmentsByDay } from '../helpers/group-appointments-by-day'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

export function useListAppointmentViewMode(
  totalAppointments: number,
  establishment: EstablishmentSlugApiResponse,
  appointments: GetAppointmentByEstablishmentModel[],
) {
  const [isChangingAppointmentsPage, startAppointmentsPageTransition] =
    useTransition()
  const [appointmentsPagination, setAppointmentsPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger
        .withDefault(12)
        .withOptions({ clearOnDefault: false }),
    },
    { shallow: true },
  )

  const appointmentDayGroups = groupAppointmentsByDay(
    appointments,
    establishment.timezone,
  )
  const hasAppointments = totalAppointments > 0

  const changeAppointmentsPage = (
    pageChangeDetails: PaginationPageChangeDetails,
  ) => {
    startAppointmentsPageTransition(() => {
      setAppointmentsPagination({
        page: pageChangeDetails.page,
        page_size: pageChangeDetails.pageSize,
      })
    })
  }

  const formatAppointmentsCount = (appointmentsCount: number) => {
    const appointmentsLabel =
      appointmentsCount === 1 ? 'agendamento' : 'agendamentos'
    return `${appointmentsCount} ${appointmentsLabel}`
  }

  return {
    appointmentDayGroups,
    appointmentsPagination,
    hasAppointments,
    isChangingAppointmentsPage,
    changeAppointmentsPage,
    formatAppointmentsCount,
  }
}
