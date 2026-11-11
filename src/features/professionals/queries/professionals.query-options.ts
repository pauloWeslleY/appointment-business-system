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
  const canFetchProfessionalsList =
    !!establishmentId && !!userId && !!organizationId
  return queryOptions({
    queryKey: professionalsQueryKeys.list(
      establishmentId,
      userId,
      organizationId,
    ),
    queryFn: canFetchProfessionalsList
      ? () => listProfessionalsService(establishmentId)
      : skipToken,
  })
}

export function professionalDetailsQueryOptions(
  professionalId?: string,
  userId?: string,
  organizationId?: string,
) {
  const canFetchProfessionalDetails =
    !!professionalId && !!userId && !!organizationId
  return queryOptions({
    queryKey: professionalsQueryKeys.detail(
      professionalId,
      userId,
      organizationId,
    ),
    queryFn: canFetchProfessionalDetails
      ? () => getProfessionalService(professionalId)
      : skipToken,
  })
}

export function professionalAvailabilityQueryOptions(
  availabilityRequest: ProfessionalAvailabilityApiRequest,
  userId?: string,
) {
  const canFetchProfessionalAvailability =
    !!userId &&
    ProfessionalAvailabilityApiRequestSchema.safeParse(availabilityRequest)
      .success
  return queryOptions({
    queryKey: professionalsQueryKeys.availability(availabilityRequest, userId),
    queryFn: canFetchProfessionalAvailability
      ? () => getProfessionalAvailabilityService(availabilityRequest)
      : skipToken,
    staleTime: 0,
    retry: false,
  })
}
