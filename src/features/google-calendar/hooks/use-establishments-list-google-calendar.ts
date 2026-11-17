import type { PaginationPageChangeDetails } from '@chakra-ui/react'
import { useRouteContext } from '@tanstack/react-router'
import { parseAsBoolean, parseAsInteger, useQueryStates } from 'nuqs'
import { useTransition } from 'react'

import {
  type DialogGoogleCalendarType,
  mapDialogGoogleCalendar,
} from '../helpers/dialog-google-calendar'

const ESTABLISHMENTS_PAGE_SIZE = 5

export function useEstablishmentsListGoogleCalendar() {
  const { memberContext } = useRouteContext({ from: '/_app/_authenticated' })
  const listEstablishmentsGoogleCalendar = memberContext.establishments
  const [isPendingPagination, startTransition] = useTransition()
  const [searchParams, setSearchParams] = useQueryStates(
    {
      open_dialog_connect_google: parseAsBoolean.withDefault(false),
      open_dialog_disconnect_google: parseAsBoolean.withDefault(false),
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
  const pageSize = Math.max(1, searchParams.page_size)
  const pageCount = Math.max(
    1,
    Math.ceil(listEstablishmentsGoogleCalendar.length / pageSize),
  )
  const page = Math.max(1, Math.min(searchParams.page, pageCount))
  const pageStart = (page - 1) * pageSize
  const paginatedEstablishments = listEstablishmentsGoogleCalendar.slice(
    pageStart,
    pageStart + pageSize,
  )

  function handlePaginationChange(details: PaginationPageChangeDetails) {
    startTransition(async () => {
      await setSearchParams((prevState) => ({
        ...prevState,
        page: details.page,
        page_size: details.pageSize,
      }))
    })
  }

  function handleDialogGoogleCalendar(
    open: boolean,
    dialog: DialogGoogleCalendarType,
  ) {
    const dialogGoogleCalendarSelected = mapDialogGoogleCalendar[dialog]
    setSearchParams((prevState) => ({
      ...prevState,
      [dialogGoogleCalendarSelected]: open,
    }))
  }

  function handleDialogIntegrateGoogleCalendar(
    establishmentId: string,
    dialog: DialogGoogleCalendarType,
  ) {
    handleDialogGoogleCalendar(true, dialog)
    sessionStorage.setItem('selected_establishment_id', establishmentId)
  }

  return {
    searchParams,
    listEstablishmentsGoogleCalendar,
    paginatedEstablishments,
    page,
    pageSize,
    isPendingPagination,
    handlePaginationChange,
    handleDialogGoogleCalendar,
    handleDialogIntegrateGoogleCalendar,
  }
}
