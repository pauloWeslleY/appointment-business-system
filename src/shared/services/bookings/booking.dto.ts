export const BookingStatus = {
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'concluded',
} as const

export type BookingStatusType =
  (typeof BookingStatus)[keyof typeof BookingStatus]

export interface GetBookingByEstablishmentModel {
  id: string
  date: string
  status: BookingStatusType
  userId: string
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

export interface GetBookingByEstablishmentQueryParams {
  establishmentId: string
  from: string
  to: string
}
