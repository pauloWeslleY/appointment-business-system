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

export function useFilterTableEstablishment(
  startTransition: React.TransitionStartFunction,
  // search: Pick<FilterSearchEstablishmentType, 'opening' | 'status'>,
) {
  const [
    filterSearchParamsTableEstablishment,
    setFilterSearchParamsTableEstablishment,
  ] = useQueryStates(
    {
      opening: parseAsString.withDefault(''),
      status: parseAsArrayOf(
        parseAsStringLiteral(STATUSES_APPOINTMENT),
      ).withDefault([]),
    },
    {
      shallow: false,
    },
  )

  const mapColorOpeningEstablishment: Record<string, ColorPalette> = {
    true: 'green',
    false: 'red',
  }

  const onChangeOpeningEstablishment = (opening: string | null) => {
    startTransition(() => {
      void setFilterSearchParamsTableEstablishment({ opening: opening ?? '' })
    })
  }

  const onChangeStatusEstablishment = (
    statusSelected: EstablishmentStatusType[],
  ) => {
    startTransition(() => {
      void setFilterSearchParamsTableEstablishment({ status: statusSelected })
    })
  }

  const clearStatusEstablishment = () => {
    startTransition(() => {
      void setFilterSearchParamsTableEstablishment({ status: null })
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
