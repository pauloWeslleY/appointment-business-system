import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useDebouncedSearch } from '@/shared/hooks/use-debounced-search'

import { servicePageQueryOptions } from '../queries/service-page.query-options'

export function useServicePage(establishmentId: string) {
  const [search] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    page_size: parseAsInteger.withDefault(12),
    q: parseAsString.withDefault(''),
    status: parseAsString.withDefault(''),
  })
  const { data: session } = useAppSession()
  const debouncedServicesSearch = useDebouncedSearch(search.q)
  const isActiveServicesFilter =
    search.status === 'active'
      ? true
      : search.status === 'inactive'
        ? false
        : undefined

  const {
    data: servicesPageData,
    error: servicesError,
    isLoading: isLoadingServices,
    refetch: refetchServices,
  } = useQuery({
    ...servicePageQueryOptions(
      {
        establishmentId,
        page: search.page,
        pageSize: search.page_size,
        q: debouncedServicesSearch,
        active: isActiveServicesFilter,
      },
      session?.user.id,
      session?.session.activeOrganizationId,
    ),
    enabled: debouncedServicesSearch === search.q,
  })

  const services = servicesPageData?.services ?? []
  const totalServices = servicesPageData?.total ?? 0
  const servicesSummary = servicesPageData?.summary
  const servicesScopeKey = `${session?.user.id ?? ''}:${session?.session.activeOrganizationId ?? ''}:${establishmentId}`

  const retryServices = () => refetchServices()

  return {
    services,
    totalServices,
    servicesSummary,
    servicesError,
    isLoadingServices,
    retryServices,
    servicesScopeKey,
  }
}
