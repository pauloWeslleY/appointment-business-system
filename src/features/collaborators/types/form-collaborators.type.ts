import type z from 'zod'

import type { CollaboratorsSchema } from '../schemas/collaborators.schemas'

export type CollaboratorsFormData = z.infer<typeof CollaboratorsSchema>

export type CollaboratorsFormDataInput = z.input<typeof CollaboratorsSchema>
