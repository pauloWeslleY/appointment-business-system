import z from 'zod'

import { ServiceEstablishmentListItemApiResponseSchema } from './service-establishment-api-response.schema'

export const ServicePageApiRequestSchema = z.object({
  establishmentId: z.uuid(),
  page: z.number().int().min(1).max(1_000_000),
  pageSize: z.number().int().min(1).max(100),
  q: z.string().max(200).optional(),
  active: z.boolean().optional(),
})

export const ServicePageApiResponseSchema = z.object({
  services: z.array(ServiceEstablishmentListItemApiResponseSchema),
  total: z.number().int().nonnegative(),
  summary: z.object({
    totalServices: z.number().int().nonnegative(),
    activeServices: z.number().int().nonnegative(),
    inactiveServices: z.number().int().nonnegative(),
    totalValueInCents: z.number().int().nonnegative().safe(),
    totalAppointments: z.number().int().nonnegative(),
  }),
})
