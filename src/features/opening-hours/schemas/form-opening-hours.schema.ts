import z from 'zod'

import { RegexTime } from '@/shared/utils/regex-time'

import { validateOpeningHoursField } from '../helpers/validate-opening-hours-field'

export const OpeningHoursFormDataSchema = z.object({
  day: z.coerce
    .number<number>({
      error: (issue) =>
        issue.input === undefined
          ? 'O dia da semana deve ser um número entre 0 e 6'
          : 'Dia da semana inválido',
    })
    .int()
    .min(0)
    .max(6),
  open: z
    .string('Horário de abertura inválido!')
    .regex(RegexTime, 'Horário deverá estar no formato HH:mm.')
    .refine(validateOpeningHoursField, {
      message: 'Horário de abertura inválido!',
    }),
  close: z
    .string('Horário de fechamento inválido!')
    .regex(RegexTime, 'Horário deverá estar no formato HH:mm.')
    .refine(validateOpeningHoursField, {
      message: 'Horário de fechamento inválido!',
    }),
})
