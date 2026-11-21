import { parseAsStringEnum, useQueryState } from 'nuqs'

import {
  ServiceEstablishmentViewMode,
  type ServiceEstablishmentViewModeType,
} from '../types/service-establishment-view-mode.type'

export function useServiceEstablishmentViewMode() {
  const [serviceEstablishmentViewMode, setServiceEstablishmentViewModeSearch] =
    useQueryState(
      'view',
      parseAsStringEnum(Object.values(ServiceEstablishmentViewMode))
        .withDefault(ServiceEstablishmentViewMode.CARD)
        .withOptions({ shallow: true }),
    )

  const changeServiceEstablishmentViewMode = (
    selectedViewMode: ServiceEstablishmentViewModeType,
  ): void => {
    setServiceEstablishmentViewModeSearch(selectedViewMode)
  }

  return {
    serviceEstablishmentViewMode,
    changeServiceEstablishmentViewMode,
  }
}
