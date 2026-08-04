import { type ColorPalette } from '@chakra-ui/react'

import {
  BookingStatus,
  type BookingStatusType,
} from '../types/booking-status.type'

export const getBadgeBookingColor: Record<
  BookingStatusType,
  ColorPalette
> = {
  [BookingStatus.CONFIRMED]: 'blue',
  [BookingStatus.CANCELLED]: 'red',
  [BookingStatus.CONCLUDED]: 'green',
} as const
