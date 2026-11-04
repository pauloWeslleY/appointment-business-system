import { queryOptions, skipToken } from '@tanstack/react-query'

import {
  getProfessionalService,
  listProfessionalsService,
} from '../services/professional.service'
import { professionalsQueryKeys } from './professionals.query-key'
export function professionalsListQueryOptions(
  establishmentId?: string,
  userId?: string,
  organizationId?: string,
) {
  const hasContext = !!establishmentId && !!userId && !!organizationId
  return queryOptions({
    queryKey: professionalsQueryKeys.list(
      establishmentId,
      userId,
      organizationId,
    ),
    queryFn: hasContext
      ? () => listProfessionalsService(establishmentId)
      : skipToken,
  })
}
export function professionalDetailsQueryOptions(
  professionalId?: string,
  userId?: string,
  organizationId?: string,
) {
  const hasContext = !!professionalId && !!userId && !!organizationId
  return queryOptions({
    queryKey: professionalsQueryKeys.detail(
      professionalId,
      userId,
      organizationId,
    ),
    queryFn: hasContext
      ? () => getProfessionalService(professionalId)
      : skipToken,
  })
}
