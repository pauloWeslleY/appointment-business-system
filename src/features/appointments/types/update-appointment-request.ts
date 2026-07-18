import type { AppointmentStatusType } from './appointment-status.type'

export interface UpdateAppointmentRequest {
  id: string
  date: string
  status: AppointmentStatusType
}
