import z from 'zod'

export const EstablishmentOpeningHoursFormSchema = z.object({
  weekdays: z.array(z.string()),
  intervals: z.array(z.object({ open: z.string(), close: z.string() })),
})
