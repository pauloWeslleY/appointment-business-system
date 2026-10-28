import { type z } from 'zod'

import type {
  UpdateStatusMemberFormSchema,
  UpdateStatusMemberRequestApiSchema,
  UpdateStatusMemberResponseApiSchema,
} from '../schemas/update-status-member.api.schema'

export type UpdateStatusMemberRequestType = z.infer<
  typeof UpdateStatusMemberRequestApiSchema
>

export type UpdateStatusMemberFormType = z.infer<
  typeof UpdateStatusMemberFormSchema
>

export type UpdateStatusMemberResponseType = z.infer<
  typeof UpdateStatusMemberResponseApiSchema
>
