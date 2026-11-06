import { createListCollection } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsStringLiteral,
  useQueryStates,
} from 'nuqs'

import {
  mapStatusLegalEntity,
  TAX_INFORMATION_STATUSES,
} from '../types/tax-information-status.type'

export const loadCollectionPageSizesTaxInformation = createListCollection({
  items: [5, 10, 50, 100].map((page) => ({
    value: page.toString(),
    label: page.toString(),
  })),
})

export const loadCollectionStatusTaxInformation = createListCollection({
  items: TAX_INFORMATION_STATUSES.map((status) => ({
    value: status,
    label: mapStatusLegalEntity(status).label,
  })),
})

export function useFilterTableTaxInformation() {
  const { limit } = useSearch({ from: '/_app/_authenticated/_admin/settings/' })
  const [filterTaxInformation, setFilterTaxInformation] = useQueryStates(
    {
      limit: parseAsInteger.withDefault(limit ?? 5),
      status: parseAsArrayOf(
        parseAsStringLiteral(TAX_INFORMATION_STATUSES),
      ).withDefault([]),
    },
    {
      shallow: true,
    },
  )

  const onChangeLimitTaxInformation = (limit: string[]) => {
    setFilterTaxInformation((prev) => ({
      ...prev,
      limit: Number(limit[0] ?? 5),
    }))
  }

  const onChangeStatusTaxInformation = (status: string[]) => {
    setFilterTaxInformation((prev) => ({
      ...prev,
      status: status as typeof TAX_INFORMATION_STATUSES,
    }))
  }

  const clearSelectTaxInformation = (value: 'limit' | 'status') => {
    const defaultValues = {
      limit: 5,
      status: [] as typeof TAX_INFORMATION_STATUSES,
    }

    setFilterTaxInformation((prev) => ({
      ...prev,
      [value]: defaultValues[value],
    }))
  }

  return {
    filterTaxInformation,
    onChangeLimitTaxInformation,
    onChangeStatusTaxInformation,
    clearSelectTaxInformation,
  }
}
