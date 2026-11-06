import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { parseAsBoolean, parseAsString, useQueryStates } from 'nuqs'
import { useMemo, useState } from 'react'

import { taxInformationListQueryOptions } from '../queries/tax-information.query-options'

export function useTableLegalEntities() {
  const [
    menuOpenTableActionsLegalEntities,
    setMenuOpenTableActionsLegalEntities,
  ] = useState(false)
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const [searchParamsTaxInformation, setSearchParamsTaxInformation] =
    useQueryStates(
      {
        open_dialog_update: parseAsBoolean.withDefault(false),
        open_dialog_summary: parseAsBoolean.withDefault(false),
        next_cursor: parseAsString,
      },
      {
        shallow: true,
      },
    )
  const { limit, q, status } = useSearch({
    from: '/_app/_authenticated/_admin/settings/',
  })
  const {
    data: listLegalEntities,
    error: errorListLegalEntities,
    isLoading: isLoadingListLegalEntities,
    isFetching: isFetchingListLegalEntities,
  } = useQuery(
    taxInformationListQueryOptions({
      limit,
      cursor: searchParamsTaxInformation.next_cursor,
    }),
  )

  const legalEntitiesTable = useMemo(() => {
    const query = q?.trim().toLowerCase() ?? ''
    return (listLegalEntities?.legalEntities || []).filter((legalEntity) => {
      const nameMatch =
        !query ||
        legalEntity.legalName.toLowerCase().includes(query) ||
        legalEntity.tradeName.toLowerCase().includes(query)

      const statusMatch = !status || legalEntity.status === status
      return nameMatch && statusMatch
    })
  }, [listLegalEntities?.legalEntities, q, status])

  const isNextCursorAvailable = listLegalEntities?.nextCursor || null
  const disabledNextCursor =
    !isNextCursorAvailable || isFetchingListLegalEntities

  function handleOpenDialogTaxInformation(
    open: boolean,
    dialog: 'open_dialog_summary' | 'open_dialog_update',
  ) {
    setSearchParamsTaxInformation((prev) => ({ ...prev, [dialog]: open }))
  }

  function handleNextCursorTaxInformation() {
    if (!isNextCursorAvailable) {
      return
    }

    setSearchParamsTaxInformation((prev) => ({
      ...prev,
      next_cursor: isNextCursorAvailable,
    }))
  }

  function handleMenuOpenTableActionsLegalEntities(
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) {
    setAnchorElement(event.currentTarget)
    setMenuOpenTableActionsLegalEntities(true)
    sessionStorage.setItem('selected_legal_entity_id', id)
  }

  function handleMenuTableActionsLegalEntities(open: boolean) {
    setMenuOpenTableActionsLegalEntities(open)

    if (
      !open &&
      !searchParamsTaxInformation.open_dialog_summary &&
      !searchParamsTaxInformation.open_dialog_update
    ) {
      sessionStorage.removeItem('selected_legal_entity_id')
      return
    }
  }

  return {
    anchorElement,
    disabledNextCursor,
    listLegalEntities,
    legalEntitiesTable,
    isLoadingListLegalEntities,
    searchParamsTaxInformation,
    errorListLegalEntities,
    menuOpenTableActionsLegalEntities,
    handleNextCursorTaxInformation,
    handleOpenDialogTaxInformation,
    handleMenuTableActionsLegalEntities,
    handleMenuOpenTableActionsLegalEntities,
  }
}
