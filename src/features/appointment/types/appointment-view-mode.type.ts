import { z } from 'zod'

export const AppointmentViewMode = {
  LIST: 'list',
  CARD: 'card',
} as const

export const AppointmentViewModeSchema = z.enum(AppointmentViewMode)

export type AppointmentViewModeType = z.infer<typeof AppointmentViewModeSchema>
