import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useState } from 'react'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useDebouncedSearch } from '@/shared/hooks/use-debounced-search'
import { usePagination } from '@/shared/hooks/use-pagination'

import { professionalPageQueryOptions } from '../queries/professional-page.query-options'

const establishmentDashboardRoute = getRouteApi(
  '/_app/_authenticated/dashboard/$slug',
)

export function useProfessionalsPage() {
  const [professionalEditorState, setProfessionalEditorState] = useState<{
    professionalId: string
    professionalsScopeKey: string
  } | null>(null)
  const [{ q: professionalsSearch, page: currentPage, page_size: pageSize }] =
    useQueryStates({
      q: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(10),
    })
  const { establishment } = establishmentDashboardRoute.useLoaderData()
  const { data: session } = useAppSession()
  const debouncedProfessionalsSearch = useDebouncedSearch(professionalsSearch)
  const professionalsScopeKey = `${session?.user.id ?? ''}:${session?.session.activeOrganizationId ?? ''}:${establishment.id}`
  const {
    data: professionalsPageData,
    isPending: isLoadingProfessionals,
    error: professionalsError,
    refetch: refetchProfessionals,
  } = useQuery({
    ...professionalPageQueryOptions(
      {
        establishmentId: establishment.id,
        page: currentPage,
        pageSize,
        q: debouncedProfessionalsSearch,
      },
      session?.user.id,
      session?.session.activeOrganizationId,
    ),
    enabled: debouncedProfessionalsSearch === professionalsSearch,
  })
  const professionals = professionalsPageData?.professionals ?? []
  const filteredProfessionalsCount = professionalsPageData?.total ?? 0
  const professionalsSummary = professionalsPageData?.summary
  const professionalEditor =
    professionalEditorState?.professionalsScopeKey === professionalsScopeKey
      ? professionalEditorState
      : null

  const {
    pagination: professionalsPagination,
    loadTablePagination: visibleProfessionals,
    handlePaginationChange: handleProfessionalsPageChange,
  } = usePagination(professionals, filteredProfessionalsCount)

  const openProfessionalEditor = (professionalId: string) =>
    setProfessionalEditorState({ professionalId, professionalsScopeKey })

  const closeProfessionalEditor = () => setProfessionalEditorState(null)
  const retryProfessionals = () => refetchProfessionals()

  return {
    professionals,
    visibleProfessionals,
    filteredProfessionalsCount,
    professionalsSummary,
    professionalsPagination,
    handleProfessionalsPageChange,
    professionalsSearch,
    isLoadingProfessionals,
    professionalsError,
    retryProfessionals,
    professionalEditor,
    openProfessionalEditor,
    closeProfessionalEditor,
    professionalsScopeKey,
  }
}
