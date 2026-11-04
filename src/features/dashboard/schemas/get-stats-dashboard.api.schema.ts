import z from 'zod'

export const StatsDashboardApiResponseSchema = z.object({
  totalAppointments: z.number().int().min(0).max(9007199254740991),
  totalRevenue: z.number().int().min(0).max(9007199254740991),
  totalServices: z.number().int().min(0).max(9007199254740991),
  totalClients: z.number().int().min(0).max(9007199254740991),
  appointmentsByStatus: z.object({
    pending: z.number().int().min(0).max(9007199254740991),
    confirmed: z.number().int().min(0).max(9007199254740991),
    concluded: z.number().int().min(0).max(9007199254740991),
    cancelled: z.number().int().min(0).max(9007199254740991),
  }),
  excludedAppointments: z.number().int().min(0).max(9007199254740991),
  revenueBasis: z.literal('concluded_services'),
  revenueUnit: z.literal('cents'),
  timezone: z.string(),
})
