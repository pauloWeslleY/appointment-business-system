import type { BookingStatusType } from '@/features/bookings/types/booking-status.type'

export interface ServiceEstablishmentDetailsModel {
  id: string
  name: string
  description: string
  imageUrl: string
  servicePriceInCents: number
  status: boolean
  createdAt: string
  updatedAt: string | null
  bookings: [
    {
      id: string
      date: string
      status: BookingStatusType
      notes: string
      createdAt: string
      updatedAt: string
      user: {
        id: string
        name: string
        image: string
      }
    },
  ]
}
