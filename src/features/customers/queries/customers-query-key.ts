export const customersQueryKeys = {
  all: () => ['customers'] as const,

  lists: () => [...customersQueryKeys.all(), 'list'] as const,

  detail: (customerId?: string) =>
    [...customersQueryKeys.all(), 'detail', customerId || null] as const,

  establishment: (establishmentId?: string) =>
    [
      ...customersQueryKeys.lists(),
      'establishment',
      establishmentId || null,
    ] as const,
}
