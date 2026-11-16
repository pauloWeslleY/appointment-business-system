import type { AppointmentListApiResponse } from '../types/appointment-list-api-response.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import type { GetAppointmentByEstablishmentQueryParams } from '../types/get-appointment-by-establishment-query-params'

export function mapAppointmentListItem(
  {
    serviceName,
    customerName,
    ...appointment
  }: AppointmentListApiResponse['appointments'][number],
  {
    establishmentId,
    organizationId,
  }: Pick<
    GetAppointmentByEstablishmentQueryParams,
    'establishmentId' | 'organizationId'
  >,
): GetAppointmentByEstablishmentModel {
  return {
    ...appointment,
    serviceName: serviceName,
    customerName: customerName,
    establishmentId,
    organizationId,
  }
}
