import { useQuery } from '@tanstack/react-query'

import { getAppointmentByEstablishmentService } from '../api/appointment.service'
import { appointmentQueryKeys } from '../queries/appointment-query-key'
import type { GetAppointmentByEstablishmentQueryParams } from '../types/get-appointment-by-establishment.type'

export const useGetAppointmentByEstablishment = (
  queryParams: GetAppointmentByEstablishmentQueryParams,
) => {
  const validateQueryParams = Object.values(queryParams).every(
    (value) => value !== undefined && value !== null && value !== '',
  )

  return useQuery({
    queryKey: appointmentQueryKeys.establishment(queryParams),
    queryFn: () => getAppointmentByEstablishmentService(queryParams),
    enabled: validateQueryParams,
  })
}
