import { useQuery } from '@tanstack/react-query'

import { bookingQueryKeys } from '../queries/booking-query-key'
import { getListBookingByServicesService } from '../services/booking.service'
import type { GetListBookingByServiceQueryParams } from '../types/get-list-booking-by-service.query-params'

export const useGetBookingByService = (
  queryParams: GetListBookingByServiceQueryParams,
) => {
  const validateQueryParams = Object.values(queryParams).every(
    (value) => value !== undefined && value !== null && value !== '',
  )

  return useQuery({
    queryKey: bookingQueryKeys.services(queryParams),
    queryFn: () => getListBookingByServicesService(queryParams),
    enabled: validateQueryParams,
  })
}
