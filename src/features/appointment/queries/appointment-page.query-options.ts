import { queryOptions, skipToken } from '@tanstack/react-query'

import { AppointmentPageApiRequestSchema } from '../schemas/appointment-page-api.schema'
import { getAppointmentPageService } from '../services/appointment-page.service'
import type { AppointmentPageApiRequest } from '../types/appointment-page-api.type'
import { appointmentQueryKeys } from './appointment.query-key'

export function appointmentPageQueryOptions(
  input: AppointmentPageApiRequest,
  userId?: string,
) {
  const valid = AppointmentPageApiRequestSchema.safeParse(input).success

  return queryOptions({
    queryKey: [...appointmentQueryKeys.all(), 'page', userId, input],
    queryFn:
      userId && valid
        ? ({ signal }) => getAppointmentPageService(input, signal)
        : skipToken,
  })
}
