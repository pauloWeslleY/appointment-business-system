import type { GetAppointmentByEstablishmentQueryParams } from '../types/get-appointment-by-establishment-query-params'
import type { GetListAppointmentByServiceQueryParams } from '../types/get-list-appointment-by-service.query-params'

export const appointmentQueryKeys = {
  all: () => ['appointment'] as const,
  establishment: (
    params: GetAppointmentByEstablishmentQueryParams,
    userId?: string,
  ) => ['appointment', userId ?? null, 'list', params] as const,
  services: (params: GetListAppointmentByServiceQueryParams, userId?: string) =>
    ['appointment', userId ?? null, 'service', params] as const,
  detail: (
    id: string,
    establishmentId: string,
    organizationId: string,
    userId?: string,
  ) =>
    [
      'appointment',
      userId ?? null,
      organizationId,
      establishmentId,
      'detail',
      id,
    ] as const,
}
