import z from 'zod'

export const EstablishmentStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const

export const EstablishmentStatusSchema = z.enum(EstablishmentStatus)

export type EstablishmentStatusType = z.infer<typeof EstablishmentStatusSchema>
