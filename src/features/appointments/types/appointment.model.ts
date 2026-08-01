import type { BookingStatusType } from './appointment-status.type'

export interface AppointmentModel {
  id: string
  date: string
  createdAt: string
  updatedAt: string
  status: BookingStatusType
  userId: string
  serviceId: string
}
