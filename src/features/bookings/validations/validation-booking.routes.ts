import { redirect } from '@tanstack/react-router'
import dayjs from 'dayjs'

export const validationBookingRouteHome = (
  search: {
    to?: string
    from?: string
    status?: string
    service_id?: string
    q?: string
  },
  establishmentId: string,
) => {
  if (!search.from || !search.to) {
    const dateCurrent = dayjs()

    throw redirect({
      to: '/dashboard/$establishmentId/bookings',
      params: {
        establishmentId: establishmentId,
      },
      search: {
        from: dateCurrent.format('YYYY-MM-DD'),
        to: dateCurrent.add(1, 'month').format('YYYY-MM-DD'),
      },
    })
  }
}
