import { queryOptions, skipToken } from '@tanstack/react-query'

import { getConnectionGoogleCalendar } from '../services/google-calendar.service'
import { googleCalendarQueryKeys } from './google-calendar.query-key'

export function getConnectionGoogleCalendarQueryOptions(
  establishmentId?: string,
) {
  return queryOptions({
    queryKey: googleCalendarQueryKeys.connection(establishmentId),
    queryFn:
      establishmentId !== undefined && establishmentId !== ''
        ? () => getConnectionGoogleCalendar(establishmentId)
        : skipToken,
  })
}
