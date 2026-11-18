import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'

import { appointmentRangeBoundary } from '../helpers/appointment-date'
import { appointmentListQueryOptions } from '../queries/appointment.query-options'
import type { GetAppointmentByEstablishmentQueryParams } from '../types/get-appointment-by-establishment-query-params'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useGetAppointmentByEstablishment(
  params: Omit<GetAppointmentByEstablishmentQueryParams, 'organizationId'>,
) {
  const { data: session } = useAppSession()
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
