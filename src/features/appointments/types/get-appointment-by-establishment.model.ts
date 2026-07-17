import type { AppointmentStatusType } from './appointment-status.type'

export interface GetAppointmentByEstablishmentModel {
  id: string
  date: string
  status: AppointmentStatusType
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
