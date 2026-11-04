import z from 'zod'

export const DailyAppointmentsDashboardApiResponseSchema = z.array(
  z.object({
    id: z.uuid(),
    dateAppointment: z.iso.datetime({ offset: true }),
    service: z.string(),
    status: z.enum(['pending', 'confirmed', 'concluded', 'cancelled']),
    user: z.string(),
  }),
)
