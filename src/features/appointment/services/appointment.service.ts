import { z } from 'zod'

import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  AppointmentListApiRequestSchema,
  CreateAppointmentApiRequestSchema,
  UpdateAppointmentApiRequestSchema,
  UpdateStatusAppointmentApiRequestSchema,
} from '../schemas/appointment-api-request.schema'
import {
  AppointmentApiResponseSchema,
  AppointmentListApiResponseSchema,
} from '../schemas/appointment-api-response.schema'
import { AppointmentServiceListRequestSchema } from '../schemas/appointment-service-list-api-request.schema'
import type { AppointmentModel } from '../types/appointment.model'
import type { AppointmentListApiResponse } from '../types/appointment-list-api-response.type'
import type { CreateAppointmentRequest } from '../types/create-appointment-request'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import type { GetAppointmentByEstablishmentQueryParams } from '../types/get-appointment-by-establishment-query-params'
import type { GetListAppointmentByServiceQueryParams } from '../types/get-list-appointment-by-service.query-params'
import type { UpdateAppointmentRequest } from '../types/update-appointment-request'
import type { UpdateStatusAppointmentRequest } from '../types/update-status-appointment-request.type'

export async function getAppointmentByEstablishmentService(
  input: GetAppointmentByEstablishmentQueryParams,
): Promise<GetAppointmentByEstablishmentModel[]> {
  const params = AppointmentListApiRequestSchema.parse(input)
  const { api, validate } = httpDependencies<AppointmentListApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/appointments',
    params,
  })

  return AppointmentListApiResponseSchema.parse(
    validate.errors(response),
  ).appointments.map((item) => ({
    ...item,
    establishmentId: params.establishmentId,
    organizationId: params.organizationId,
  }))
}

export async function getAppointmentByIdService(
  id: string,
  establishmentId: string,
  organizationId: string,
): Promise<AppointmentModel> {
  const params = z
    .object({ establishmentId: z.uuid(), organizationId: z.string().min(1) })
    .parse({ establishmentId, organizationId })

  const { api, validate } = httpDependencies<AppointmentModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/appointments/' + z.uuid().parse(id),
    params,
  })

  return AppointmentApiResponseSchema.parse(validate.errors(response))
}

export async function getListAppointmentByServicesService(
  input: GetListAppointmentByServiceQueryParams,
): Promise<GetAppointmentByEstablishmentModel[]> {
  const { date, ...scope } = AppointmentServiceListRequestSchema.parse(input)
  const from = new Date(date)
  from.setHours(0, 0, 0, 0)
  const to = new Date(from)
  to.setDate(to.getDate() + 1)
  return getAppointmentByEstablishmentService({
    ...scope,
    from: from.toISOString(),
    to: to.toISOString(),
  })
}

export async function createAppointmentService(
  input: CreateAppointmentRequest,
): Promise<AppointmentModel> {
  const body = CreateAppointmentApiRequestSchema.parse(input)
  const { api, validate } = httpDependencies<AppointmentModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/appointments',
    body,
  })

  return AppointmentApiResponseSchema.parse(validate.errors(response))
}

export async function updateAppointmentService(
  input: UpdateAppointmentRequest,
): Promise<AppointmentModel> {
  const body = UpdateAppointmentApiRequestSchema.parse(input)
  const { api, validate } = httpDependencies<AppointmentModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/admin/appointments',
    body,
  })

  return AppointmentApiResponseSchema.parse(validate.errors(response))
}

export async function updateStatusAppointmentService(
  input: UpdateStatusAppointmentRequest,
): Promise<AppointmentModel> {
  const body = UpdateStatusAppointmentApiRequestSchema.parse(input)
  if (
    body.status === 'cancelled' &&
    (!body.serviceId || !body.cancellationReason)
  ) {
    throw new Error('Informe o serviço e o motivo do cancelamento.')
  }
  const { api, validate } = httpDependencies<AppointmentModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/admin/appointments/status',
    body,
  })

  return AppointmentApiResponseSchema.parse(validate.errors(response))
}
