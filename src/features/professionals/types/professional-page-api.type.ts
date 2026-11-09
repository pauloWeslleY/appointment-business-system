import type z from 'zod'

import type {
  ProfessionalPageApiRequestSchema,
  ProfessionalPageApiResponseSchema,
} from '../schemas/professional-page-api.schema'
export type ProfessionalPageApiRequest = z.infer<
  typeof ProfessionalPageApiRequestSchema
>
export type ProfessionalPageApiResponse = z.infer<
  typeof ProfessionalPageApiResponseSchema
>
