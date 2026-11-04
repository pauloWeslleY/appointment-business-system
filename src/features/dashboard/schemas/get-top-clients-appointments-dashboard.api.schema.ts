import z from 'zod'

export const TopClientsAppointmentsDashboardApiResponseSchema = z.array(
  z.object({
    customerId: z.uuid(),
    name: z.string(),
    totalAppointments: z.number().int().min(0).max(9007199254740991),
  }),
)
