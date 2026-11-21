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

export const appointmentStatusUpdateErrorTitle: Record<
  AppointmentStatusType,
  string
> = {
  [AppointmentStatus.PENDING]:
    'Não foi possível voltar o agendamento para pendente.',
  [AppointmentStatus.CONFIRMED]: 'Não foi possível confirmar o agendamento.',
  [AppointmentStatus.CANCELLED]: 'Não foi possível cancelar o agendamento.',
  [AppointmentStatus.CONCLUDED]: 'Não foi possível concluir o agendamento.',
}
