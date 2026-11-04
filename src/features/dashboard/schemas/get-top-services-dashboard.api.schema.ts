import z from 'zod'

export const TopServicesDashboardApiResponseSchema = z.array(
  z.object({
    id: z.uuid(),
    name: z.string(),
    imageUrl: z.union([z.string(), z.null()]),
    description: z.string(),
    appointments: z.number().int().min(0).max(9007199254740991),
  }),
)
