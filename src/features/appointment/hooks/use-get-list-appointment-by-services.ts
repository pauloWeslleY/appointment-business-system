import { useQuery } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { appointmentServiceListQueryOptions } from '../queries/appointment.query-options'
import type { GetListAppointmentByServiceQueryParams } from '../types/get-list-appointment-by-service.query-params'

export function useGetAppointmentByService(
  params: Omit<GetListAppointmentByServiceQueryParams, 'organizationId'>,
) {
  const { data: session } = authClient.useSession()
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
