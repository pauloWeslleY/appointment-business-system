import { type z } from 'zod'

import type {
  UpdateRoleMemberFormSchema,
  UpdateRoleMemberRequestApiSchema,
  UpdateRoleMemberResponseApiSchema,
} from '../schemas/update-role-member.api.schema'

export type UpdateRoleMemberRequestType = z.infer<
  typeof UpdateRoleMemberRequestApiSchema
>

export type UpdateRoleMemberFormType = z.infer<
  typeof UpdateRoleMemberFormSchema
>

export type UpdateRoleMemberResponseType = z.infer<
  typeof UpdateRoleMemberResponseApiSchema
>
