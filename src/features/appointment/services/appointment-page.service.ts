import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { mapAppointmentListItem } from '../helpers/map-appointment-item'
import {
  AppointmentPageApiRequestSchema,
  AppointmentPageApiResponseSchema,
} from '../schemas/appointment-page-api.schema'
import type {
  AppointmentPageApiRequest,
  AppointmentPageApiResponse,
  AppointmentPageModel,
} from '../types/appointment-page-api.type'

export async function getAppointmentPageService(
  input: AppointmentPageApiRequest,
  signal?: AbortSignal,
): Promise<AppointmentPageModel> {
  const params = AppointmentPageApiRequestSchema.parse(input)
  const { api, validate } = httpDependencies<AppointmentPageApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/appointments',
    params,
    signal,
  })
  const result = AppointmentPageApiResponseSchema.parse(
    validate.errors(response),
  )

  return {
    ...result,
    appointments: result.appointments.map((appointment) =>
      mapAppointmentListItem(appointment, params),
    ),
  }
}
