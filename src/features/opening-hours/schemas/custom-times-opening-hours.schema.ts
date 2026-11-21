import z from 'zod'

import { RegexTime } from '@/shared/utils/regex-time'

export function createCustomTimesOpeningHoursSchema(
  openTime: string,
  closeTime: string,
) {
  const customTimeSchema = z
    .string()
    .trim()
    .min(1, 'O horário de atendimento não pode estar vazio')
    .regex(RegexTime, 'Horário deverá estar no formato HH:mm.')
    .pipe(
      z
        .string()
        .refine(
          (customTime) => customTime >= openTime && customTime < closeTime,
          {
            message: `Informe um horário a partir de ${openTime} e antes de ${closeTime}.`,
          },
        ),
    )

  return z.strictObject({
    customTimes: z
      .array(z.object({ time: customTimeSchema }))
      .min(1, 'É necessário pelo menos um registro do horário de atendimento'),
  })
}
