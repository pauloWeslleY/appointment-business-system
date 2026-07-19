import type { AppointmentStatusType } from './appointment-status.type'

export interface AppointmentModel {
  id: string
  date: string
  createdAt: string
  updatedAt: string
  status: AppointmentStatusType
  userId: string
  serviceId: string
}
