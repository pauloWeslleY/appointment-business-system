import { type BoxProps } from '@chakra-ui/react'

import {
  BookingStatus,
  type BookingStatusType,
} from '../types/appointment-status.type'

export const getBadgeBookingColor: Record<
  BookingStatusType,
  BoxProps['colorPalette']
> = {
  [BookingStatus.CONFIRMED]: 'blue',
  [BookingStatus.CANCELLED]: 'red',
  [BookingStatus.CONCLUDED]: 'green',
} as const
