import z from 'zod'

export const DashboardAppointmentStatusSchema = z.enum([
  'pending',
  'confirmed',
  'concluded',
  'cancelled',
])

export const DashboardQueryApiRequestSchema = z.object({
  establishmentId: z.uuid(),
  organizationId: z.string().trim().min(1).optional(),
  from: z.iso.datetime({ offset: true }),
  to: z.iso.datetime({ offset: true }),
  status: DashboardAppointmentStatusSchema.optional(),
  customerId: z.uuid().optional(),
  serviceId: z.uuid().optional(),
})
