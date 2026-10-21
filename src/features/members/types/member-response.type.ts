import type z from 'zod'

import type { GetMeContextSchema } from '../schemas/get-me-context.schema'
import type { MemberDetailsSchema } from '../schemas/member-details.schema'

export type GetMeContextResponse = z.infer<typeof GetMeContextSchema>

export type GetMemberDetailsResponse = z.infer<typeof MemberDetailsSchema>
