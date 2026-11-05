import { z } from 'zod'

export const AppointmentRouteSearchSchema = z.object({
  to: z.string().optional(),
  from: z.string().optional(),
  status: z.string().optional(),
  service_id: z.string().optional(),
  q: z.string().optional(),
  page: z.number().optional().default(1),
  page_size: z.number().optional().default(12),
})
