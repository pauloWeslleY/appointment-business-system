import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  AppointmentPageApiRequestSchema,
  AppointmentPageApiResponseSchema,
} from '../schemas/appointment-page-api.schema'
import type {
  AppointmentPageApiRequest,
  AppointmentPageModel,
} from '../types/appointment-page-api.type'

export async function getAppointmentPageService(
  input: AppointmentPageApiRequest,
  signal?: AbortSignal,
): Promise<AppointmentPageModel> {
  const params = AppointmentPageApiRequestSchema.parse(input)
  const { api, validate } = httpDependencies<unknown>()
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
    appointments: result.appointments.map((item) => ({
      ...item,
      establishmentId: params.establishmentId,
      organizationId: params.organizationId,
    })),
  }
}
