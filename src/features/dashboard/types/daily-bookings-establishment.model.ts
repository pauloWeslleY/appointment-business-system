import type { BookingStatusType } from '@/features/bookings/types/booking-status.type'

export interface DailyBookingsEstablishmentModel {
  id: string
  dateBooking: string
  status: BookingStatusType
  user: string
  service: string
}
