import z from 'zod'

import { RegexTime } from '@/shared/utils/regex-time'

import { IntervalOpeningHoursApiResponseSchema } from './opening-hours-response.api.schema'

export const GetCustomTimesOpeningHoursRequestApiSchema = z.strictObject({
  establishmentId: z
    .uuid()
    .trim()
    .min(1, 'O ID do estabelecimento não pode estar vazio'),
  openingHoursId: z
    .uuid()
    .trim()
    .min(1, 'O ID do horário de atendimento não pode estar vazio'),
})

export const CustomTimesOpeningHoursRequestApiSchema = z.strictObject({
  ...GetCustomTimesOpeningHoursRequestApiSchema.shape,
  customTimes: z.array(
    z.string().regex(RegexTime, 'Horário deverá estar no formato HH:mm.'),
  ),
})

export const CustomTimesOpeningHoursResponseApiSchema = z.strictObject({
  id: z
    .uuid()
    .trim()
    .min(1, 'O ID do horário de atendimento não pode estar vazio'),
  establishmentId: z
    .uuid()
    .trim()
    .min(1, 'O ID do estabelecimento não pode estar vazio'),
  day: z.number().int().min(0).max(6),
  ...IntervalOpeningHoursApiResponseSchema.shape,
  customTimes: z.array(
    z.string().regex(RegexTime, 'Horário deverá estar no formato HH:mm.'),
  ),
})
