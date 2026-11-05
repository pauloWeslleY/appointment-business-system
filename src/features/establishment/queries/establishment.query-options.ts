import { queryOptions, skipToken } from '@tanstack/react-query'

import {
  getEstablishmentAdminBySlugService,
  getEstablishmentByIdService,
  getEstablishmentBySlugService,
  getEstablishmentsByOrganizationService,
  getListOpeningHoursEstablishmentService,
} from '../services/establishment.service'
import type { GetOpeningHoursRequest } from '../types/opening-hours-request.type'
import { establishmentQueryKeys } from './establishment.query-key'

export const establishmentSlugQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: establishmentQueryKeys.slug(slug),
    queryFn:
      slug.trim() !== ''
        ? () => getEstablishmentBySlugService(slug)
        : skipToken,
  })
}

export const establishmentAdminSlugQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: establishmentQueryKeys.adminSlug(slug),
    queryFn: () => getEstablishmentAdminBySlugService(slug),
  })
}

export const establishmentByIdQueryOptions = (establishmentId: string) => {
  return queryOptions({
    queryKey: establishmentQueryKeys.detail(establishmentId),
    queryFn:
      establishmentId.trim() !== ''
        ? () => getEstablishmentByIdService(establishmentId)
        : skipToken,
  })
}

export const establishmentAvailabilityQueryOptions = (
  params: GetOpeningHoursRequest,
) => {
  return queryOptions({
    queryKey: establishmentQueryKeys.availability(params),
    queryFn:
      params.establishmentId.trim() !== '' &&
      params.serviceId.trim() !== '' &&
      params.selectedDate.trim() !== ''
        ? () => getListOpeningHoursEstablishmentService(params)
        : skipToken,
  })
}

export const establishmentByOrganizationQueryOptions = (
  organizationId?: string,
) => {
  return queryOptions({
    queryKey: establishmentQueryKeys.organization(organizationId),
    queryFn: organizationId
      ? () => getEstablishmentsByOrganizationService(organizationId)
      : skipToken,
  })
}
