export const AppointmentStatus = {
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'concluded',
} as const

export type AppointmentStatusType =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus]
