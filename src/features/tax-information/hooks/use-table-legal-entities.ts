import { useQuery } from '@tanstack/react-query'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useState } from 'react'

import { taxInformationListQueryOptions } from '../queries/tax-information.query-options'

export function useTableLegalEntities() {
  const [
    menuOpenTableActionsLegalEntities,
    setMenuOpenTableActionsLegalEntities,
  ] = useState(false)
  const [
    isOpenDialogUpdateTaxInformation,
    setIsOpenDialogUpdateTaxInformation,
  ] = useQueryState('open_dialog_update', parseAsBoolean.withDefault(false))
  const [isOpenDialogTaxInformation, setIsOpenDialogTaxInformation] =
    useQueryState('open_dialog_summary', parseAsBoolean.withDefault(false))
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const {
    data: listLegalEntities,
    error: errorListLegalEntities,
    isLoading: isLoadingListLegalEntities,
  } = useQuery(taxInformationListQueryOptions())
  const legalEntitiesTable = listLegalEntities?.legalEntities || []

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
      !isOpenDialogTaxInformation &&
      !isOpenDialogUpdateTaxInformation
    ) {
      sessionStorage.removeItem('selected_legal_entity_id')
      return
    }
  }

  return {
    anchorElement,
    listLegalEntities,
    legalEntitiesTable,
    isLoadingListLegalEntities,
    isOpenDialogTaxInformation,
    isOpenDialogUpdateTaxInformation,
    errorListLegalEntities,
    menuOpenTableActionsLegalEntities,
    setIsOpenDialogTaxInformation,
    setIsOpenDialogUpdateTaxInformation,
    handleMenuTableActionsLegalEntities,
    handleMenuOpenTableActionsLegalEntities,
  }
}
