import type { z } from 'zod'

import type { EstablishmentLinksFormSchema } from '../schemas/establishment-links-form.schema'

export type EstablishmentLinksForm = z.infer<
  typeof EstablishmentLinksFormSchema
>
