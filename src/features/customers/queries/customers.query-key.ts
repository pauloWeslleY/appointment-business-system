export const customersQueryKeys = {
  all: () => ['customers'] as const,
  lists: () => [...customersQueryKeys.all(), 'list'] as const,
  detail: (customerId?: string, userId?: string, organizationId?: string) =>
    [
      ...customersQueryKeys.all(),
      'detail',
      userId ?? null,
      organizationId ?? null,
      customerId ?? null,
    ] as const,
  establishment: (
    establishmentId?: string,
    userId?: string,
    organizationId?: string,
  ) =>
    [
      ...customersQueryKeys.lists(),
      userId ?? null,
      organizationId ?? null,
      establishmentId ?? null,
    ] as const,
}
