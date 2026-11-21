import type { PaginationPageChangeDetails } from '@chakra-ui/react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo, useTransition } from 'react'

import type { FilterSearchEstablishmentType } from '../types/filter-search-establishment.type'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'

export function useTableEstablishment(
  establishments: EstablishmentOrganizationProfileApiResponse[],
  search: Pick<FilterSearchEstablishmentType, 'page' | 'page_size'>,
) {
  const [isPendingPagination, startTransition] = useTransition()
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(search.page || 1),
      page_size: parseAsInteger.withDefault(search.page_size || 4).withOptions({
        clearOnDefault: false,
      }),
    },
    {
      shallow: false,
    },
  )

  const visibleEstablishments = useMemo<
    EstablishmentOrganizationProfileApiResponse[]
  >(() => {
    const start = (pagination.page - 1) * pagination.page_size
    const end = start + pagination.page_size
    return establishments.slice(start, end)
  }, [establishments, pagination.page, pagination.page_size])

  const hasSearchEstablishmentsEmpty = establishments.length === 0

  const handlePageChange = (details: PaginationPageChangeDetails) => {
    startTransition(() => {
      setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  return {
    pagination,
    visibleEstablishments,
    isPendingPagination,
    hasSearchEstablishmentsEmpty,
    handlePageChange,
    startTransition,
  }
}
