import { type ColorPalette } from '@chakra-ui/react'

import {
  AppointmentStatus,
  type AppointmentStatusType,
} from '../types/appointment-status.type'

export const getBadgeAppointmentColor: Record<
  AppointmentStatusType,
  ColorPalette
> = {
  [AppointmentStatus.PENDING]: 'orange',
  [AppointmentStatus.CONFIRMED]: 'blue',
  [AppointmentStatus.CANCELLED]: 'red',
  [AppointmentStatus.CONCLUDED]: 'green',
} as const
