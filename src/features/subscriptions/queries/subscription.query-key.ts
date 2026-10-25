export const subscriptionQueryKey = {
  all: ['subscription'] as const,
  organizations: (userId?: string) =>
    [...subscriptionQueryKey.all, 'organizations', userId] as const,
  context: (userId?: string, organizationId?: string) =>
    [...subscriptionQueryKey.all, 'context', userId, organizationId] as const,
  access: (userId: string, organizationId: string) =>
    [...subscriptionQueryKey.all, 'access', userId, organizationId] as const,
  notices: (userId: string, organizationId: string) =>
    [...subscriptionQueryKey.all, 'notices', userId, organizationId] as const,
}
