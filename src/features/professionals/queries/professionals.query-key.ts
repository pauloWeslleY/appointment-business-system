import type { ProfessionalAvailabilityApiRequest } from '../types/professional-api.type'
import type { ProfessionalPageApiRequest } from '../types/professional-page-api.type'

export const professionalsQueryKeys = {
  all: ['professionals'] as const,
  page: (
    professionalPageRequest: ProfessionalPageApiRequest,
    userId?: string,
    organizationId?: string | null,
  ) =>
    [
      'professionals',
      'page',
      userId,
      organizationId,
      professionalPageRequest,
    ] as const,
  list: (establishmentId?: string, userId?: string, organizationId?: string) =>
    [
      'professionals',
      'list',
      userId ?? null,
      organizationId ?? null,
      establishmentId ?? null,
    ] as const,
  detail: (professionalId?: string, userId?: string, organizationId?: string) =>
    [
      'professionals',
      'detail',
      userId ?? null,
      organizationId ?? null,
      professionalId ?? null,
    ] as const,
  availability: (
    availabilityRequest: ProfessionalAvailabilityApiRequest,
    userId?: string,
  ) =>
    [
      'professionals',
      'availability',
      userId ?? null,
      availabilityRequest,
    ] as const,
}
