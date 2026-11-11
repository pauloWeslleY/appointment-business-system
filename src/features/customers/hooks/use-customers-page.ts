import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useDebouncedSearch } from '@/shared/hooks/use-debounced-search'

import { customerPageQueryOptions } from '../queries/customer-page.query-options'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useCustomersPage() {
  const { establishment } = dashboardRoute.useLoaderData()
  const { data: session } = useAppSession()
  const [search] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    page_size: parseAsInteger.withDefault(10),
    q: parseAsString.withDefault(''),
    status: parseAsString.withDefault(''),
    sex: parseAsString,
  })
  const query = useDebouncedSearch(search.q)
  const active =
    search.status === 'active'
      ? true
      : search.status === 'inactive'
        ? false
        : undefined

  const { data, error, isLoading, refetch } = useQuery({
    ...customerPageQueryOptions(
      {
        establishmentId: establishment.id,
        page: search.page,
        pageSize: search.page_size,
        q: query,
        gender: search.sex ?? undefined,
        active,
      },
      session?.user.id,
      session?.session.activeOrganizationId,
    ),
    enabled: query === search.q,
  })

  const retryCustomers = () => refetch()

  return {
    customers: data?.customers ?? [],
    total: data?.total ?? 0,
    summary: data?.summary,
    customersError: error,
    isLoadingCustomers: isLoading,
    retryCustomers,
    scopeKey: `${session?.user.id ?? ''}:${session?.session.activeOrganizationId ?? ''}:${establishment.id}`,
  }
}
