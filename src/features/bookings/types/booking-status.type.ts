export const BookingStatus = {
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  CONCLUDED: 'concluded',
} as const

export type BookingStatusType =
  (typeof BookingStatus)[keyof typeof BookingStatus]

export const bookingStatusLabel: Record<BookingStatusType, string> = {
  [BookingStatus.CONFIRMED]: 'Confirmado',
  [BookingStatus.CANCELLED]: 'Cancelado',
  [BookingStatus.CONCLUDED]: 'Concluído',
} as const
