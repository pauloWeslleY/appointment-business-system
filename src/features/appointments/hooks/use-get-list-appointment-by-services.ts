import { useQuery } from '@tanstack/react-query'

import { appointmentQueryKeys } from '../queries/appointment-query-key'
import { getListAppointmentByServicesService } from '../services/appointment.service'
import type { GetListBookingByServiceQueryParams } from '../types/get-list-booking-by-service.query-params'

export const useGetAppointmentByService = (
  queryParams: GetListBookingByServiceQueryParams,
) => {
  const validateQueryParams = Object.values(queryParams).every(
    (value) => value !== undefined && value !== null && value !== '',
  )

  return useQuery({
    queryKey: appointmentQueryKeys.services(queryParams),
    queryFn: () => getListAppointmentByServicesService(queryParams),
    enabled: validateQueryParams,
  })
}
