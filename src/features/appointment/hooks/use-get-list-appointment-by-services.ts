import { useQuery } from '@tanstack/react-query'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { appointmentServiceListQueryOptions } from '../queries/appointment.query-options'
import type { GetListAppointmentByServiceQueryParams } from '../types/get-list-appointment-by-service.query-params'

export function useGetAppointmentByService(
  params: Omit<GetListAppointmentByServiceQueryParams, 'organizationId'>,
) {
  const { data: session } = useAppSession()
  return useQuery(
    appointmentServiceListQueryOptions(
      {
        ...params,
        organizationId: session?.session.activeOrganizationId ?? '',
      },
      session?.user.id,
    ),
  )
}
