import { z } from 'zod'

import { AppointmentStatusSchema } from '../types/appointment-status.type'

export const AppointmentApiResponseSchema = z.object({
  id: z.uuid(),
  createdByUserId: z.string(),
  organizationId: z.string(),
  establishmentId: z.uuid(),
  serviceId: z.uuid(),
  customerId: z.uuid(),
  professionalId: z.union([z.uuid(), z.null()]),
  startsAt: z.iso.datetime({ offset: true }),
  endsAt: z.iso.datetime({ offset: true }),
  status: AppointmentStatusSchema,
  source: z.enum(['customer', 'admin']),
  timezone: z.string(),
  serviceNameSnapshot: z.string(),
  servicePriceInCentsSnapshot: z.number().int().min(0).max(9007199254740991),
  serviceDurationInMinutesSnapshot: z
    .number()
    .int()
    .gt(0)
    .max(9007199254740991),
  customerNameSnapshot: z.string(),
  notes: z.union([z.string(), z.null()]),
  cancellationReason: z.union([z.string(), z.null()]),
  cancelledAt: z.union([z.iso.datetime({ offset: true }), z.null()]),
  cancelledByUserId: z.union([z.string(), z.null()]),
  concludedAt: z.union([z.iso.datetime({ offset: true }), z.null()]),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
  version: z.number().int().min(0).max(9007199254740991),
})

export const AppointmentListApiResponseSchema = z.object({
  appointments: z.array(
    AppointmentApiResponseSchema.pick({
      id: true,
      customerId: true,
      professionalId: true,
      serviceId: true,
      startsAt: true,
      endsAt: true,
      status: true,
      serviceNameSnapshot: true,
      customerNameSnapshot: true,
    }),
  ),
})
