import { z } from 'zod'

export const ServiceEstablishmentViewMode = {
  TABLE: 'table',
  CARD: 'card',
} as const

export const ServiceEstablishmentViewModeSchema = z.enum(
  ServiceEstablishmentViewMode,
)

export type ServiceEstablishmentViewModeType = z.infer<
  typeof ServiceEstablishmentViewModeSchema
>
