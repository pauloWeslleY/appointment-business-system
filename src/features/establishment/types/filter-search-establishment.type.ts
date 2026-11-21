import type { z } from 'zod'

import { type filterSearchEstablishmentSchema } from '@/features/establishment/schemas/filter-search-establishment.schema'

export type FilterSearchEstablishmentType = z.infer<
  typeof filterSearchEstablishmentSchema
>
