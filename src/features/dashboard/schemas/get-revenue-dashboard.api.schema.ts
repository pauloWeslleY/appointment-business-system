import z from 'zod'

export const RevenueDashboardApiResponseSchema = z.array(
  z.object({
    date: z.string(),
    revenue: z.number().int().min(0).max(9007199254740991),
    appointments: z.number().int().min(0).max(9007199254740991),
  }),
)
