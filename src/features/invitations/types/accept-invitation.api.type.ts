import type { z } from 'zod'

import type { AcceptInvitationApiResponseSchema } from '../schemas/accept-invitation.api.schema'

export type AcceptInvitationApiResponse = z.infer<
  typeof AcceptInvitationApiResponseSchema
>
