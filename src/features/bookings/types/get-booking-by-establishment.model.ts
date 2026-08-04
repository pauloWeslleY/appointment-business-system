import type { BookingStatusType } from './booking-status.type'

export interface GetBookingByEstablishmentModel {
  id: string
  date: string
  status: BookingStatusType
  notes: string | null
  user: {
    id: string
    name: string
    email: string
    image: string | null
  }
  service: {
    id: string
    name: string
    description: string
    imageUrl: string
    servicePriceInCents: number
    establishmentId: string
  }
}
