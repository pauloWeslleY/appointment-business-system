import z from 'zod'

export const ReconciliationDashboardApiResponseSchema = z.object({
  previous: z.object({
    totalAppointments: z.number().int().min(0).max(9007199254740991),
    totalRevenue: z.number().int().min(0).max(9007199254740991),
    totalServices: z.number().int().min(0).max(9007199254740991),
    totalClients: z.number().int().min(0).max(9007199254740991),
  }),
  current: z.object({
    totalAppointments: z.number().int().min(0).max(9007199254740991),
    totalRevenue: z.number().int().min(0).max(9007199254740991),
    totalServices: z.number().int().min(0).max(9007199254740991),
    totalClients: z.number().int().min(0).max(9007199254740991),
  }),
  difference: z.object({
    totalAppointments: z
      .number()
      .int()
      .min(-9007199254740991)
      .max(9007199254740991),
    totalRevenue: z.number().int().min(-9007199254740991).max(9007199254740991),
    totalServices: z
      .number()
      .int()
      .min(-9007199254740991)
      .max(9007199254740991),
    totalClients: z.number().int().min(-9007199254740991).max(9007199254740991),
  }),
  excludedAppointments: z.number().int().min(0).max(9007199254740991),
  exclusions: z.object({
    invalid_context: z.number().int().min(0).max(9007199254740991),
    missing_or_invalid_snapshot: z.number().int().min(0).max(9007199254740991),
    invalid_history: z.number().int().min(0).max(9007199254740991),
  }),
  revenueBasis: z.literal('concluded_services'),
  revenueUnit: z.literal('cents'),
  timezone: z.string(),
})
