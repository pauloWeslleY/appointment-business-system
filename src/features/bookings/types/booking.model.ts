import type { BookingStatusType } from './booking-status.type'

export interface BookingModel {
  id: string
  date: string
  createdAt: string
  updatedAt: string
  status: BookingStatusType
  userId: string
  serviceId: string
}
