import { queryOptions, skipToken } from '@tanstack/react-query'

import { ProfessionalAvailabilityApiRequestSchema } from '../schemas/professional-request.api.schema'
import {
  getProfessionalAvailabilityService,
  getProfessionalService,
  listProfessionalsService,
} from '../services/professional.service'
import type { ProfessionalAvailabilityApiRequest } from '../types/professional-api.type'
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

export function professionalAvailabilityQueryOptions(
  params: ProfessionalAvailabilityApiRequest,
  userId?: string,
) {
  const hasContext =
    !!userId &&
    ProfessionalAvailabilityApiRequestSchema.safeParse(params).success
  return queryOptions({
    queryKey: professionalsQueryKeys.availability(params, userId),
    queryFn: hasContext
      ? () => getProfessionalAvailabilityService(params)
      : skipToken,
    staleTime: 0,
    retry: false,
  })
}
