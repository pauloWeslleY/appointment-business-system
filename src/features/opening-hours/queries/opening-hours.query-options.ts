import { queryOptions, skipToken } from '@tanstack/react-query'

import {
  getOpeningHoursByIdService,
  listEstablishmentOpeningHoursService,
} from '../services/opening-hours.service'
import {
  openingHoursQueryKeys,
  type OpeningHoursQueryScope,
} from './opening-hours.query-key'

export function getOpeningHoursByIdQueryOptions(
  scope: OpeningHoursQueryScope,
  openingHoursId?: string,
) {
  const hasRequiredParams =
    scope.userId.trim() !== '' &&
    scope.organizationId.trim() !== '' &&
    openingHoursId !== undefined &&
    openingHoursId.trim() !== ''

  return queryOptions({
    queryKey: openingHoursQueryKeys.detail(scope, openingHoursId),
    queryFn: hasRequiredParams
      ? () => getOpeningHoursByIdService(openingHoursId)
      : skipToken,
  })
}

export function establishmentOpeningHoursQueryOptions(
  scope: OpeningHoursQueryScope,
  establishmentId?: string,
) {
  const hasRequiredParams =
    scope.userId.trim() !== '' &&
    scope.organizationId.trim() !== '' &&
    establishmentId !== undefined &&
    establishmentId.trim() !== ''

  return queryOptions({
    queryKey: openingHoursQueryKeys.establishment(scope, establishmentId),
    queryFn: hasRequiredParams
      ? () => listEstablishmentOpeningHoursService(establishmentId)
      : skipToken,
  })
}
