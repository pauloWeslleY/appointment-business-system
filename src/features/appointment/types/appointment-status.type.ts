import { z } from 'zod'

export const AppointmentStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  CONCLUDED: 'concluded',
} as const

export const AppointmentStatusSchema = z.enum(AppointmentStatus)

export type AppointmentStatusType = z.infer<typeof AppointmentStatusSchema>

export const appointmentStatusLabel: Record<AppointmentStatusType, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
  concluded: 'Concluído',
}
