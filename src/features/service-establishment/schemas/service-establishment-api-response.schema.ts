import { z } from 'zod'

import { AppointmentStatusSchema } from '@/features/appointment/types/appointment-status.type'

export const ServiceEstablishmentApiResponseSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.url().nullable(),
  servicePriceInCents: z.number().int().nonnegative(),
  durationInMinutes: z.number().int().positive().max(2147483647).nullable(),
  slug: z.string().min(1).nullable(),
  establishmentId: z.uuid(),
  status: z.boolean(),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }).nullable(),
})

export const ServiceEstablishmentListItemApiResponseSchema =
  ServiceEstablishmentApiResponseSchema.omit({ establishmentId: true }).extend({
    totalAppointments: z.number().int().nonnegative(),
  })
export const ServiceEstablishmentDetailsApiResponseSchema =
  ServiceEstablishmentApiResponseSchema.omit({ establishmentId: true }).extend({
    appointments: z.array(
      z.object({
        id: z.uuid(),
        date: z.iso.datetime({ offset: true }),
        status: AppointmentStatusSchema,
        notes: z.string().nullable(),
        createdAt: z.iso.datetime({ offset: true }),
        updatedAt: z.iso.datetime({ offset: true }).nullable(),
        user: z.object({
          id: z.string(),
          name: z.string().min(1),
          image: z.url().nullable(),
        }),
      }),
    ),
  })
