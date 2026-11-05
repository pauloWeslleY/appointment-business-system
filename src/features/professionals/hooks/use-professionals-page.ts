import { getRouteApi } from '@tanstack/react-router'
import { parseAsString, useQueryState } from 'nuqs'
import { useState } from 'react'

import { authClient } from '@/lib/auth'
import { usePagination } from '@/shared/hooks/use-pagination'

import { useProfessionals } from './use-professionals'

const dashboardRoute = getRouteApi('/dashboard/$slug')

export function useProfessionalsPage() {
  const { establishment } = dashboardRoute.useLoaderData()
  const { data: session } = authClient.useSession()
  const scopeKey = `${session?.user.id ?? ''}:${session?.session.activeOrganizationId ?? ''}:${establishment.id}`
  const query = useProfessionals(establishment.id)
  const [search] = useQueryState('q', parseAsString.withDefault(''))
  const searchTerm = search.trim().toLocaleLowerCase('pt-BR')
  const professionals = query.data?.professionals ?? []
  const filteredProfessionals = professionals.filter((professional) =>
    [professional.displayName, professional.specialty].some((value) =>
      value.toLocaleLowerCase('pt-BR').includes(searchTerm),
    ),
  )

  const { pagination, loadTablePagination, handlePaginationChange } =
    usePagination(filteredProfessionals)
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
    filteredCount: filteredProfessionals.length,
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
