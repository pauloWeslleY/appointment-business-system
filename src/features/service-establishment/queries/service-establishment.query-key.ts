export const serviceEstablishmentQueryKeys = {
  all: ['service-establishment'] as const,
  lists: () => ['service-establishment', 'list'] as const,
  detail: (
    establishmentId?: string,
    organizationId?: string,
    userId?: string,
  ) =>
    [
      'service-establishment',
      'list',
      userId ?? null,
      organizationId ?? null,
      establishmentId ?? null,
    ] as const,
  info: (serviceId?: string, organizationId?: string, userId?: string) =>
    [
      'service-establishment',
      'detail',
      userId ?? null,
      organizationId ?? null,
      serviceId ?? null,
    ] as const,
  getById: (serviceId?: string, organizationId?: string, userId?: string) =>
    [
      'service-establishment',
      'detail',
      userId ?? null,
      organizationId ?? null,
      serviceId ?? null,
    ] as const,
}
