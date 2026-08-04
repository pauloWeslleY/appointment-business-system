import type { PaginationPageChangeDetails } from '@chakra-ui/react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo, useTransition } from 'react'

export function usePagination<T>(data: T[]) {
  const [isPendingPagination, startTransition] = useTransition()
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(10),
    },
    {
      shallow: true,
    },
  )

  const loadTablePagination = useMemo(() => {
    const start = (pagination.page - 1) * pagination.page_size
    const end = start + pagination.page_size
    return data.slice(start, end)
  }, [data, pagination.page, pagination.page_size])

  const handlePaginationChange = (details: PaginationPageChangeDetails) => {
    startTransition(() => {
      setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  return {
    pagination,
    isPendingPagination,
    loadTablePagination,
    handlePaginationChange,
  }
}
