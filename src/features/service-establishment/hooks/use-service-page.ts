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
  const query = useDebouncedSearch(search.q)
  const active =
    search.status === 'active'
      ? true
      : search.status === 'inactive'
        ? false
        : undefined

  return useQuery({
    ...servicePageQueryOptions(
      {
        establishmentId,
        page: search.page,
        pageSize: search.page_size,
        q: query,
        active,
      },
      session?.user.id,
      session?.session.activeOrganizationId,
    ),
    enabled: query === search.q,
  })
}
