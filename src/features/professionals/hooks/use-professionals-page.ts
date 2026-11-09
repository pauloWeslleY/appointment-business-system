import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useState } from 'react'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useDebouncedSearch } from '@/shared/hooks/use-debounced-search'
import { usePagination } from '@/shared/hooks/use-pagination'

import { professionalPageQueryOptions } from '../queries/professional-page.query-options'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useProfessionalsPage() {
  const { establishment } = dashboardRoute.useLoaderData()
  const { data: session } = useAppSession()
  const scopeKey = `${session?.user.id ?? ''}:${session?.session.activeOrganizationId ?? ''}:${establishment.id}`
  const [{ q: search, page, page_size }] = useQueryStates({
    q: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    page_size: parseAsInteger.withDefault(10),
  })
  const searchQuery = useDebouncedSearch(search)
  const query = useQuery({
    ...professionalPageQueryOptions(
      {
        establishmentId: establishment.id,
        page,
        pageSize: page_size,
        q: searchQuery,
      },
      session?.user.id,
      session?.session.activeOrganizationId,
    ),
    enabled: searchQuery === search,
  })
  const professionals = query.data?.professionals ?? []

  const { pagination, loadTablePagination, handlePaginationChange } =
    usePagination(professionals, query.data?.total ?? 0)
  const [editor, setEditor] = useState<{
    professionalId: string
    scopeKey: string
  } | null>(null)
  const openUpdateProfessional = (professionalId: string) =>
    setEditor({ professionalId, scopeKey })
  const closeProfessionalEditor = () => setEditor(null)
  return {
    professionals,
    visibleProfessionals: loadTablePagination,
    filteredCount: query.data?.total ?? 0,
    summary: query.data?.summary,
    pagination,
    handlePaginationChange,
    search,
    isLoading: query.isPending,
    error: query.error,
    retryProfessionals: () => query.refetch(),
    editor: editor?.scopeKey === scopeKey ? editor : null,
    openUpdateProfessional,
    closeProfessionalEditor,
    scopeKey,
  }
}
