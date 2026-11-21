import z from 'zod'

export const GetOpeningHoursRequestSchema = z.strictObject({
  establishmentId: z.uuid(),
  serviceId: z.uuid(),
  professionalId: z.uuid().optional(),
  excludeAppointmentId: z.uuid().optional(),
  selectedDate: z.iso.datetime(),
})

export const GetOpeningHoursResponseSchema = z.array(
  z.object({
    label: z.string(),
    value: z.string(),
  }),
)
