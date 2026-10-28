import { type z } from 'zod'

import type {
  UpdateScopeMemberFormSchema,
  UpdateScopeMemberRequestApiSchema,
  UpdateScopeMemberResponseApiSchema,
} from '../schemas/update-scope-member.api.schema'

export type UpdateScopeMemberRequestType = z.infer<
  typeof UpdateScopeMemberRequestApiSchema
>

export type UpdateScopeMemberFormType = z.infer<
  typeof UpdateScopeMemberFormSchema
>

export type UpdateScopeMemberResponseType = z.infer<
  typeof UpdateScopeMemberResponseApiSchema
>
