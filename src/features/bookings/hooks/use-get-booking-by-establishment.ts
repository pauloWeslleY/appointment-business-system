import { useQuery } from '@tanstack/react-query'

import { bookingQueryKeys } from '../queries/booking-query-key'
import { getBookingByEstablishmentService } from '../services/booking.service'
import type { GetBookingByEstablishmentQueryParams } from '../types/get-booking-by-establishment-query-params'

export const useGetBookingByEstablishment = (
  queryParams: GetBookingByEstablishmentQueryParams,
) => {
  const validateQueryParams = Object.values(queryParams).every(
    (value) => value !== undefined && value !== null && value !== '',
  )

  return useQuery({
    queryKey: bookingQueryKeys.establishment(queryParams),
    queryFn: () => getBookingByEstablishmentService(queryParams),
    enabled: validateQueryParams,
  })
}
