import type z from 'zod'

import type {
  CreateProfessionalApiRequestSchema,
  EmploymentApiRequestSchema,
  UpdateProfessionalApiRequestSchema,
} from '../schemas/professional-request.api.schema'
import type {
  EmploymentResultApiResponseSchema,
  ProfessionalDetailsApiResponseSchema,
  ProfessionalListApiResponseSchema,
  ProfessionalListItemApiResponseSchema,
  UpdateProfessionalApiResponseSchema,
} from '../schemas/professional-response.api.schema'
export type ProfessionalDetailsApiResponse = z.infer<
  typeof ProfessionalDetailsApiResponseSchema
>
export type ProfessionalListItemApiResponse = z.infer<
  typeof ProfessionalListItemApiResponseSchema
>
export type ProfessionalListApiResponse = z.infer<
  typeof ProfessionalListApiResponseSchema
>
export type UpdateProfessionalApiResponse = z.infer<
  typeof UpdateProfessionalApiResponseSchema
>
export type EmploymentResultApiResponse = z.infer<
  typeof EmploymentResultApiResponseSchema
>
export type CreateProfessionalApiRequest = z.infer<
  typeof CreateProfessionalApiRequestSchema
>
export type UpdateProfessionalApiRequest = z.infer<
  typeof UpdateProfessionalApiRequestSchema
>
export type EmploymentApiRequest = z.infer<typeof EmploymentApiRequestSchema>
