import { z } from 'zod'

import { AppointmentStatusSchema } from '../types/appointment-status.type'

export const AppointmentRouteSearchSchema = z.object({
  to: z.string().optional(),
  from: z.string().optional(),
  status: AppointmentStatusSchema.optional(),
  service_id: z.uuid().optional(),
  q: z.string().max(200).optional(),
  page: z.number().int().min(1).max(1_000_000).optional().default(1),
  page_size: z.number().int().min(1).max(100).optional().default(12),
})
