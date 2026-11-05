import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'

import { appointmentListQueryOptions } from '../queries/appointment.query-options'
import type { GetAppointmentByEstablishmentQueryParams } from '../types/get-appointment-by-establishment-query-params'
import { appointmentRangeBoundary } from '../utils/appointment-date'

const dashboardRoute = getRouteApi('/dashboard/$slug')

export function useGetAppointmentByEstablishment(
  params: Omit<GetAppointmentByEstablishmentQueryParams, 'organizationId'>,
) {
  const { data: session } = authClient.useSession()
  const { establishment } = dashboardRoute.useLoaderData()
  return useQuery(
    appointmentListQueryOptions(
      {
        ...params,
        organizationId: session?.session.activeOrganizationId ?? '',
        from: appointmentRangeBoundary(params.from, establishment.timezone),
        to: appointmentRangeBoundary(params.to, establishment.timezone, true),
      },
      session?.user.id,
    ),
  )
}
