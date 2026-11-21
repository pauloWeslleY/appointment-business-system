import { queryOptions, skipToken } from '@tanstack/react-query'

import {
  getCustomTimesOpeningHoursByIdService,
  getOpeningHoursByIdService,
  listOpeningHoursEstablishmentService,
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

interface GetCustomTimesOpeningHoursQueryParams extends OpeningHoursQueryScope {
  establishmentId: string
  openingHoursId: string
}

export function getCustomTimesOpeningHoursQueryOptions(
  queryString: GetCustomTimesOpeningHoursQueryParams,
) {
  const { userId, organizationId, establishmentId, openingHoursId } =
    queryString

  const hasRequiredParams =
    userId.trim() !== '' &&
    organizationId.trim() !== '' &&
    establishmentId !== undefined &&
    establishmentId.trim() !== '' &&
    openingHoursId !== undefined &&
    openingHoursId.trim() !== ''

  return queryOptions({
    queryKey: openingHoursQueryKeys.customTimes(
      {
        userId,
        organizationId,
      },
      openingHoursId,
      establishmentId,
    ),
    queryFn: hasRequiredParams
      ? () =>
          getCustomTimesOpeningHoursByIdService({
            establishmentId,
            openingHoursId,
          })
      : skipToken,
  })
}

export function listOpeningHoursEstablishmentQueryOptions(
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
      ? () => listOpeningHoursEstablishmentService(establishmentId)
      : skipToken,
  })
}
