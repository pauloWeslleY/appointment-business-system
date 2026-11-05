import { z } from 'zod'

import { AppointmentStatusSchema } from '../types/appointment-status.type'

export const AppointmentListApiRequestSchema = z.object({
  establishmentId: z.uuid(),
  organizationId: z.string().min(1),
  from: z.iso.datetime({ offset: true }),
  to: z.iso.datetime({ offset: true }),
  serviceId: z.uuid().optional(),
  customerId: z.uuid().optional(),
  professionalId: z.uuid().optional(),
})

export const CreateAppointmentApiRequestSchema = z.object({
  customerId: z.uuid(),
  professionalId: z.union([z.uuid(), z.null()]).optional(),
  serviceId: z.uuid(),
  establishmentId: z.uuid(),
  organizationId: z.string().min(1).optional(),
  date: z.iso.datetime({ offset: true }),
  notes: z.union([z.string().max(500), z.null()]),
})

export const UpdateAppointmentApiRequestSchema = z.object({
  id: z.uuid(),
  establishmentId: z.uuid(),
  organizationId: z.string().min(1),
  date: z.iso.datetime({ offset: true }),
  notes: z.union([z.string().max(1000), z.null()]),
})

export const UpdateStatusAppointmentApiRequestSchema = z.object({
  id: z.uuid(),
  establishmentId: z.uuid(),
  status: AppointmentStatusSchema,
  serviceId: z.uuid().optional(),
  cancellationReason: z.string().min(1).max(500).optional(),
})
