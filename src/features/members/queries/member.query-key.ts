export const memberQueryKey = {
  all: ['member'] as const,
  meContext: ['me-context'] as const,

  list: () => [...memberQueryKey.all, 'list'] as const,
  context: () => [...memberQueryKey.all, 'context'] as const,

  detail: (establishmentId?: string) =>
    [...memberQueryKey.meContext, 'detail', establishmentId] as const,

  members: (organizationId?: string) =>
    [...memberQueryKey.list(), organizationId] as const,
}
