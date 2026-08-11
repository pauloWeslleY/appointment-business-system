import { queryOptions } from '@tanstack/react-query'

import {
  getEstablishmentBySlugService,
  getEstablishmentsByOwnerIdService,
} from '../services/establishment.service'
import type { EstablishmentSlugModel } from '../types/establishment.model'
import { establishmentQueryKeys } from './establishment-query-key'

export const establishmentSlugQueryOptions = (slug: string) => {
  return queryOptions<EstablishmentSlugModel>({
    queryKey: establishmentQueryKeys.slug(slug),
    queryFn: () => getEstablishmentBySlugService(slug),
    enabled: slug.trim() !== '',
  })
}

export const establishmentByOwnerQueryOptions = (ownerId?: string) => {
  return queryOptions({
    queryKey: establishmentQueryKeys.owner(ownerId),
    queryFn: () => getEstablishmentsByOwnerIdService(ownerId),
    enabled: !!ownerId,
  })
}
