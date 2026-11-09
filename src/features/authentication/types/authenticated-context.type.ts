import { type z } from 'zod'

import {
  type AuthenticatedContextApiRequestSchema,
  type AuthenticatedContextApiResponseSchema,
} from '../schemas/authenticated-context.schema'

export type AuthenticatedContextApiResponse = z.infer<
  typeof AuthenticatedContextApiResponseSchema
>

export type AuthenticatedContextApiRequest = z.infer<
  typeof AuthenticatedContextApiRequestSchema
>
