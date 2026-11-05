import type { z } from 'zod'

import type { EstablishmentColorsFormSchema } from '../schemas/establishment-colors-form.schema'

export type EstablishmentColorsForm = z.infer<
  typeof EstablishmentColorsFormSchema
>
