import { z } from 'zod'

export const AppointmentServiceListRequestSchema = z.object({
  establishmentId: z.uuid(),
  organizationId: z.string().min(1),
  serviceId: z.uuid(),
  date: z.iso.datetime({ offset: true }),
})
