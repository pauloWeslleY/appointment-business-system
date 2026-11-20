import z from 'zod'

import { StatusOpeningHours } from '../types/status-opening-hours.type'

export const OpeningHoursSummaryApiResponseSchema = z.object({
  id: z.uuid(),
  establishmentId: z.uuid(),
  dayOfWeek: z.number().int().min(0).max(6),
  openTime: z.string().regex(/^\d{2}:\d{2}$/),
  closeTime: z.string().regex(/^\d{2}:\d{2}$/),
  status: z.enum(Object.values(StatusOpeningHours)),
})

export const IntervalOpeningHoursApiResponseSchema = z.object({
  open: z.string().regex(/^\d{2}:\d{2}$/),
  close: z.string().regex(/^\d{2}:\d{2}$/),
})

export const ListOpeningHoursSummaryApiResponseSchema = z.object({
  day: z.number().int().min(0).max(6),
  intervals: z.array(IntervalOpeningHoursApiResponseSchema),
})

export const EstablishmentOpeningHoursItemApiResponseSchema =
  ListOpeningHoursSummaryApiResponseSchema.extend({
    id: z.uuid(),
  })

export const EstablishmentOpeningHoursListApiResponseSchema = z.array(
  EstablishmentOpeningHoursItemApiResponseSchema,
)
