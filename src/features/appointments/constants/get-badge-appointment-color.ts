import { type BoxProps } from '@chakra-ui/react'

import {
  AppointmentStatus,
  type AppointmentStatusType,
} from '../types/appointment-status.type'

export const getBadgeAppointmentColor: Record<
  AppointmentStatusType,
  BoxProps['colorPalette']
> = {
  [AppointmentStatus.CONFIRMED]: 'blue',
  [AppointmentStatus.CANCELLED]: 'red',
  [AppointmentStatus.COMPLETED]: 'green',
} as const
