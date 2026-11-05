import { queryOptions, skipToken } from '@tanstack/react-query'

import { AppointmentListApiRequestSchema } from '../schemas/appointment-api-request.schema'
import { AppointmentServiceListRequestSchema } from '../schemas/appointment-service-list-api-request.schema'
import {
  getAppointmentByEstablishmentService,
  getAppointmentByIdService,
  getListAppointmentByServicesService,
} from '../services/appointment.service'
import type { GetAppointmentByEstablishmentQueryParams } from '../types/get-appointment-by-establishment-query-params'
import type { GetListAppointmentByServiceQueryParams } from '../types/get-list-appointment-by-service.query-params'
import { appointmentQueryKeys } from './appointment.query-key'

export function appointmentListQueryOptions(
  params: GetAppointmentByEstablishmentQueryParams,
  userId?: string,
) {
  return queryOptions({
    queryKey: appointmentQueryKeys.establishment(params, userId),
    queryFn:
      userId && AppointmentListApiRequestSchema.safeParse(params).success
        ? () => getAppointmentByEstablishmentService(params)
        : skipToken,
  })
}

export function appointmentServiceListQueryOptions(
  params: GetListAppointmentByServiceQueryParams,
  userId?: string,
) {
  return queryOptions({
    queryKey: appointmentQueryKeys.services(params, userId),
    queryFn:
      userId && AppointmentServiceListRequestSchema.safeParse(params).success
        ? () => getListAppointmentByServicesService(params)
        : skipToken,
  })
}

export function appointmentDetailQueryOptions(
  id: string,
  establishmentId: string,
  organizationId: string,
  userId?: string,
  enabled = true,
) {
  return queryOptions({
    queryKey: appointmentQueryKeys.detail(
      id,
      establishmentId,
      organizationId,
      userId,
    ),
    queryFn:
      enabled && userId && id && establishmentId && organizationId
        ? () => getAppointmentByIdService(id, establishmentId, organizationId)
        : skipToken,
  })
}
