import type { z } from 'zod'

import { type DeleteAddressApiRequestSchema } from '../schemas/delete-address.api.schema'

export type DeleteAddressApiRequest = z.infer<
  typeof DeleteAddressApiRequestSchema
>
