import type { PaginationPageChangeDetails } from '@chakra-ui/react'
import { useRouteContext } from '@tanstack/react-router'
import {
  parseAsBoolean,
  parseAsInteger,
  useQueryState,
  useQueryStates,
} from 'nuqs'
import { useTransition } from 'react'

const ESTABLISHMENTS_PAGE_SIZE = 5

export function useEstablishmentsListGoogleCalendar() {
  const [isOpenDialogGoogleCalendar, setIsOpenDialogGoogleCalendar] =
    useQueryState('open_dialog_google', parseAsBoolean.withDefault(false))
  const { memberContext } = useRouteContext({ from: '/_app/_authenticated' })
  const listEstablishmentsGoogleCalendar = memberContext.establishments
  const [isPendingPagination, startTransition] = useTransition()
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(ESTABLISHMENTS_PAGE_SIZE),
    },
    {
      shallow: true,
      urlKeys: {
        page: 'integrations_page',
        page_size: 'integrations_page_size',
      },
    },
  )
  const pageSize = Math.max(1, pagination.page_size)
  const pageCount = Math.max(
    1,
    Math.ceil(listEstablishmentsGoogleCalendar.length / pageSize),
  )
  const page = Math.max(1, Math.min(pagination.page, pageCount))
  const pageStart = (page - 1) * pageSize
  const paginatedEstablishments = listEstablishmentsGoogleCalendar.slice(
    pageStart,
    pageStart + pageSize,
  )

  function handlePaginationChange(details: PaginationPageChangeDetails) {
    startTransition(async () => {
      await setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  function handleDialogGoogleCalendar(establishmentId: string) {
    setIsOpenDialogGoogleCalendar(true)
    sessionStorage.setItem('selected_establishment_id', establishmentId)
  }

  return {
    isOpenDialogGoogleCalendar,
    listEstablishmentsGoogleCalendar,
    paginatedEstablishments,
    page,
    pageSize,
    isPendingPagination,
    handlePaginationChange,
    handleDialogGoogleCalendar,
    setIsOpenDialogGoogleCalendar,
  }
}
