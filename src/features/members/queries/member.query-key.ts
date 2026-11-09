export const memberQueryKey = {
  all: ['member'] as const,

  list: () => [...memberQueryKey.all, 'list'] as const,

  context: () => [...memberQueryKey.all, 'context'] as const,

  detail: (establishmentId?: string) =>
    [...memberQueryKey.context(), 'detail', establishmentId] as const,

  members: (organizationId?: string) =>
    [...memberQueryKey.list(), organizationId] as const,

  activeMember: (organizationId?: string, memberId?: string) =>
    [...memberQueryKey.list(), organizationId, memberId] as const,
}
