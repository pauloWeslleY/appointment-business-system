import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useDebouncedSearch } from '@/shared/hooks/use-debounced-search'

import { appointmentPageQueryOptions } from '../queries/appointment-page.query-options'
import { AppointmentStatus } from '../types/appointment-status.type'
import { appointmentRangeBoundary } from '../helpers/appointment-date'

const pageRoute = getRouteApi(
  '/_app/_authenticated/dashboard/$slug/appointment/',
)
const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useAppointmentPage() {
  const initialSearch = pageRoute.useSearch()
  const [search] = useQueryStates({
    from: parseAsString.withDefault(initialSearch.from ?? ''),
    to: parseAsString.withDefault(initialSearch.to ?? ''),
    page: parseAsInteger.withDefault(1),
    page_size: parseAsInteger.withDefault(12),
    q: parseAsString.withDefault(''),
    service_id: parseAsString,
    status: parseAsStringEnum(Object.values(AppointmentStatus)),
  })
  const { establishment } = dashboardRoute.useLoaderData()
  const { data: session } = useAppSession()
  const debouncedAppointmentsSearch = useDebouncedSearch(search.q)

  const {
    data: appointmentsPageData,
    error: appointmentsError,
    isLoading: isLoadingAppointments,
    refetch: refetchAppointments,
  } = useQuery({
    ...appointmentPageQueryOptions(
      {
        establishmentId: establishment.id,
        organizationId: session?.session.activeOrganizationId ?? '',
        from: appointmentRangeBoundary(
          search.from ?? '',
          establishment.timezone,
        ),
        to: appointmentRangeBoundary(
          search.to ?? '',
          establishment.timezone,
          true,
        ),
        page: search.page,
        pageSize: search.page_size,
        q: debouncedAppointmentsSearch,
        status: search.status ?? undefined,
        serviceId: search.service_id ?? undefined,
      },
      session?.user.id,
    ),
    enabled: debouncedAppointmentsSearch === search.q,
  })

  const appointments = appointmentsPageData?.appointments ?? []
  const totalAppointments = appointmentsPageData?.total ?? 0
  const appointmentsSummary = appointmentsPageData?.summary
  const appointmentsScopeKey = `${session?.user.id ?? ''}:${session?.session.activeOrganizationId ?? ''}:${establishment.id}`

  const retryAppointments = () => refetchAppointments()

  return {
    appointments,
    totalAppointments,
    appointmentsSummary,
    appointmentsError,
    isLoadingAppointments,
    retryAppointments,
    appointmentsScopeKey,
  }
}
