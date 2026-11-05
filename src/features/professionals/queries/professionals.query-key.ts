import type { ProfessionalAvailabilityApiRequest } from '../types/professional-api.type'

export const professionalsQueryKeys = {
  all: ['professionals'] as const,
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
  availability: (params: ProfessionalAvailabilityApiRequest, userId?: string) =>
    ['professionals', 'availability', userId ?? null, params] as const,
}
