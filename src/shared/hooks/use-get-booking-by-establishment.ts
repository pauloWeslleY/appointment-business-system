import { useQuery } from '@tanstack/react-query'

import { bookingQueryKeys } from '../constants/bookings.query-key'
import type { GetBookingByEstablishmentQueryParams } from '../services/bookings/booking.dto'
import { getBookingByEstablishmentService } from '../services/bookings/booking.service'

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
