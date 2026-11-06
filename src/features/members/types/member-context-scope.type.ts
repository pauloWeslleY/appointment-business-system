import type { z } from 'zod'

import type { MemberContextScopeSchema } from '../schemas/member-context-scope.schema'

export type MemberContextScope = z.infer<typeof MemberContextScopeSchema>
