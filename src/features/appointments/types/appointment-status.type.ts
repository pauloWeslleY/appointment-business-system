export const AppointmentStatus = {
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'concluded',
} as const

export type AppointmentStatusType =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus]

export const appointmentStatusLabel: Record<AppointmentStatusType, string> = {
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
  concluded: 'Concluído',
} as const
