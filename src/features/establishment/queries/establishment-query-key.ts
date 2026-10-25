import type { GetOpeningHoursRequest } from '../types/opening-hours-request.type'

export const establishmentQueryKeys = {
  all: ['establishment'] as const,

  lists: () => [...establishmentQueryKeys.all, 'list'] as const,

  details: () => [...establishmentQueryKeys.all, 'detail'] as const,

  slug: (slug: string) =>
    [...establishmentQueryKeys.all, 'slug', slug] as const,

  organizationProfile: (organizationProfileId?: string) => {
    return [
      ...establishmentQueryKeys.lists(),
      'organization-profile',
      { organizationProfileId: organizationProfileId ?? null },
    ] as const
  },

  detail: (establishmentId?: string) => {
    return [
      ...establishmentQueryKeys.details(),
      { establishmentId: establishmentId ?? null },
    ] as const
  },

  availability: (params: GetOpeningHoursRequest) => {
    return [
      ...establishmentQueryKeys.all,
      'availability',
      {
        establishmentId: params.establishmentId,
        serviceId: params.serviceId,
        selectedDate: params.selectedDate,
      },
    ] as const
  },
}
