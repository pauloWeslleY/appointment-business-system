export interface OpeningHoursQueryScope {
  userId: string
  organizationId: string
}

export const openingHoursQueryKeys = {
  all: ['opening-hours'] as const,

  scope: (scope: OpeningHoursQueryScope) =>
    [...openingHoursQueryKeys.all, scope.userId, scope.organizationId] as const,

  establishment: (scope: OpeningHoursQueryScope, establishmentId?: string) =>
    [
      ...openingHoursQueryKeys.scope(scope),
      'establishment',
      establishmentId ?? null,
    ] as const,

  detail: (scope: OpeningHoursQueryScope, openingHoursId?: string) =>
    [...openingHoursQueryKeys.scope(scope), 'detail', openingHoursId] as const,
} as const
