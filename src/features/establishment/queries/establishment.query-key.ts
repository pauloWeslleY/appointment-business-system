import type { GetOpeningHoursRequest } from '../types/opening-hours-request.type'

export interface EstablishmentAvailabilityScope {
  userId?: string
  organizationId?: string | null
}

export const establishmentQueryKeys = {
  all: ['establishment'] as const,

  lists: () => [...establishmentQueryKeys.all, 'list'] as const,

  details: () => [...establishmentQueryKeys.all, 'detail'] as const,

  adminSlug: (slug: string) =>
    [...establishmentQueryKeys.all, 'admin-slug', slug] as const,

  slug: (slug: string) =>
    [...establishmentQueryKeys.all, 'slug', slug] as const,

  organization: (organizationId?: string) => {
    return [
      ...establishmentQueryKeys.lists(),
      'organization',
      { organizationId: organizationId ?? null },
    ] as const
  },

  detail: (establishmentId?: string) => {
    return [
      ...establishmentQueryKeys.details(),
      { establishmentId: establishmentId ?? null },
    ] as const
  },

  availability: (
    params: GetOpeningHoursRequest,
    scope?: EstablishmentAvailabilityScope,
  ) => {
    return [
      ...establishmentQueryKeys.all,
      'availability',
      {
        establishmentId: params.establishmentId,
        serviceId: params.serviceId,
        professionalId: params.professionalId,
        excludeAppointmentId: params.excludeAppointmentId,
        selectedDate: params.selectedDate,
        userId: scope?.userId,
        organizationId: scope?.organizationId,
      },
    ] as const
  },
}
