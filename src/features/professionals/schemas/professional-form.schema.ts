import z from 'zod'

import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from '@/shared/constants/files-config'
import { RegexTime } from '@/shared/utils/regex-time'

import { EmploymentApiRequestSchema } from './professional-request.api.schema'

export const MAX_WORK_SCHEDULE_PERIODS = 84
const WORK_PERIOD_TIME_FORMAT_MESSAGE = 'Horário deverá estar no formato HH:mm.'

function createWorkPeriodTimeSchema(requiredMessage: string) {
  return z
    .string()
    .min(1, requiredMessage)
    .regex(RegexTime, WORK_PERIOD_TIME_FORMAT_MESSAGE)
}

// O formulário mantém mensagens próprias; o schema da API não define textos.
const WorkScheduleFormSchema = z
  .array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6),
      startsAt: createWorkPeriodTimeSchema('Informe o horário de início.'),
      endsAt: createWorkPeriodTimeSchema('Informe o horário de término.'),
    }),
  )
  .max(
    MAX_WORK_SCHEDULE_PERIODS,
    `Cadastre no máximo ${MAX_WORK_SCHEDULE_PERIODS} períodos.`,
  )

export const ProfessionalFormSchema = z.object({
  displayName: z.string().trim().min(1, 'Nome é obrigatório').max(160),
  email: z.union([z.literal(''), z.email('E-mail inválido')]),
  phone: z.string().max(40),
  document: z.string().max(2000),
  bio: z.string().max(2000),
  specialty: z.string().trim().min(1, 'Especialidade é obrigatória').max(160),
  status: EmploymentApiRequestSchema.shape.status,
  workSchedule: WorkScheduleFormSchema,
  image: z
    .custom<FileList | null>(
      (value) =>
        value === null ||
        (typeof FileList !== 'undefined' && value instanceof FileList),
      'Selecione uma imagem válida',
    )
    .transform((value) => value?.item(0) ?? null)
    .refine(
      (file) => !file || file.size <= MAX_IMAGE_SIZE,
      'A imagem deve possuir no máximo 5 MB',
    )
    .refine(
      (file) =>
        !file || ACCEPTED_IMAGE_TYPES.some((type) => type === file.type),
      'Utilize JPG, PNG ou WebP',
    ),
})
