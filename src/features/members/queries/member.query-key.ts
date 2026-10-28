export const memberQueryKey = {
  all: ['member'] as const,

  list: () => [...memberQueryKey.all, 'list'] as const,

  context: () => [...memberQueryKey.all, 'context'] as const,

  meContextByOrganization: (
    activeOrganization?: string | null,
    userId?: string | null,
    establishmentId?: string | null,
  ) =>
    [
      ...memberQueryKey.context(),
      {
        activeOrganization: activeOrganization ?? null,
        userId: userId ?? null,
        establishmentId: establishmentId ?? null,
      },
    ] as const,

  detail: (establishmentId?: string) =>
    [...memberQueryKey.context(), 'detail', establishmentId] as const,

  members: (organizationId?: string) =>
    [...memberQueryKey.list(), organizationId] as const,
}
