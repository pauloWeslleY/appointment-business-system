import type z from 'zod'

import type { CreateMeContextRequest } from '../schemas/create-me-context.schema'

export type CreateMeContextRequestType = z.infer<typeof CreateMeContextRequest>
