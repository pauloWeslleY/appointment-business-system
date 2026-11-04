import { queryOptions, skipToken } from '@tanstack/react-query'

import { getOpeningHoursByIdService } from '../services/opening-hours.service'
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
