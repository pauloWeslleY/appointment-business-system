import type { ColorPalette } from '@chakra-ui/react'
import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from 'nuqs'

import {
  type EstablishmentStatusType,
  STATUSES_APPOINTMENT,
} from '../types/establishment-status.type'
import type { FilterSearchEstablishmentType } from '../types/filter-search-establishment.type'

export function useFilterTableEstablishment(
  startTransition: React.TransitionStartFunction,
  search: Pick<FilterSearchEstablishmentType, 'opening' | 'status'>,
) {
  const [
    filterSearchParamsTableEstablishment,
    setFlterSearchParamsTableEstablishment,
  ] = useQueryStates({
    opening: parseAsString.withDefault(search.opening ?? ''),
    status: parseAsArrayOf(parseAsStringLiteral(STATUSES_APPOINTMENT))
      .withDefault([])
      .withOptions({
        shallow: false,
      }),
  })

  const mapColorOpeningEstablishment: Record<string, ColorPalette> = {
    true: 'green',
    false: 'red',
  }

  const onChangeOpeningEstablishment = (opening: string | null) => {
    startTransition(() => {
      setFlterSearchParamsTableEstablishment((prev) => ({
        ...prev,
        opening: opening ?? '',
      }))
    })
  }

  const onChangeStatusEstablishment = (
    statusSelected: EstablishmentStatusType[],
  ) => {
    startTransition(() => {
      setFlterSearchParamsTableEstablishment((prevState) => ({
        ...prevState,
        status: statusSelected,
      }))
    })
  }

  const clearStatusEstablishment = () => {
    startTransition(() => {
      setFlterSearchParamsTableEstablishment((prev) => ({
        ...prev,
        status: [],
      }))
    })
  }

  return {
    mapColorOpeningEstablishment,
    filterSearchParamsTableEstablishment,
    onChangeStatusEstablishment,
    onChangeOpeningEstablishment,
    clearStatusEstablishment,
  }
}
