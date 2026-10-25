import type z from 'zod'

import type { SendInvitationsSchema } from '../schemas/send-invitation.schema'

export type SendInvitationApiRequest = z.infer<typeof SendInvitationsSchema>
