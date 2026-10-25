import { queryOptions } from '@tanstack/react-query'

import {
  getEstablishmentByIdService,
  getEstablishmentBySlugService,
  getEstablishmentsByOrganizationProfileIdService,
  getListOpeningHoursEstablishmentService,
} from '../services/establishment.service'
import type { GetOpeningHoursRequest } from '../types/opening-hours-request.type'
import { establishmentQueryKeys } from './establishment-query-key'

export const establishmentSlugQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: establishmentQueryKeys.slug(slug),
    queryFn: () => getEstablishmentBySlugService(slug),
    enabled: slug.trim() !== '',
  })
}

export const establishmentByIdQueryOptions = (establishmentId: string) => {
  return queryOptions({
    queryKey: establishmentQueryKeys.detail(establishmentId),
    queryFn: () => getEstablishmentByIdService(establishmentId),
    enabled: establishmentId.trim() !== '',
  })
}

export const establishmentAvailabilityQueryOptions = (
  params: GetOpeningHoursRequest,
) => {
  return queryOptions({
    queryKey: establishmentQueryKeys.availability(params),
    queryFn: () => getListOpeningHoursEstablishmentService(params),
    enabled:
      params.establishmentId.trim() !== '' &&
      params.serviceId.trim() !== '' &&
      params.selectedDate.trim() !== '',
  })
}

export const establishmentByOrganizationProfileQueryOptions = (
  organizationProfileId?: string,
) => {
  return queryOptions({
    queryKey: establishmentQueryKeys.organizationProfile(organizationProfileId),
    queryFn: () =>
      getEstablishmentsByOrganizationProfileIdService(organizationProfileId),
    enabled: !!organizationProfileId,
  })
}
