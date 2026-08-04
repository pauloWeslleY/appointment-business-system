import { createListCollection } from '@chakra-ui/react'

import {
  BookingStatus,
  bookingStatusLabel,
  type BookingStatusType,
} from '../types/booking-status.type'

const bookingStatusDescription: Record<BookingStatusType, string> = {
  [BookingStatus.CONFIRMED]: 'Confirmar o agendamento.',
  [BookingStatus.CANCELLED]: 'Cancelado o agendamento.',
  [BookingStatus.CONCLUDED]: 'Concluído o agendamento.',
} as const

export const loadSelectStatusBooking = Object.entries(BookingStatus).map(
  ([, value]) => ({
    value,
    label: bookingStatusLabel[value as BookingStatusType],
    description: bookingStatusDescription[value as BookingStatusType],
  }),
)

export const loadCollectionStatusBooking = createListCollection({
  items: loadSelectStatusBooking.map((bookingStatus) => ({
    label: bookingStatus.label,
    value: bookingStatus.value,
  })),
})
