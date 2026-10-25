export const invitationQueryKey = {
  all: ['invitation'] as const,
  organizationProfile: (userId?: string, organizationId?: string) =>
    [
      ...invitationQueryKey.all,
      'organization-profile',
      userId,
      organizationId,
    ] as const,
  establishments: (
    userId?: string,
    organizationId?: string,
    profileId?: string,
  ) =>
    [
      ...invitationQueryKey.all,
      'establishments',
      userId,
      organizationId,
      profileId,
    ] as const,
  lists: () => [...invitationQueryKey.all, 'list'] as const,
  list: (userId?: string, organizationId?: string) =>
    [...invitationQueryKey.lists(), userId, organizationId] as const,
  details: () => [...invitationQueryKey.all, 'detail'] as const,
  detail: (invitationId?: string, userId?: string) =>
    [...invitationQueryKey.details(), userId, invitationId] as const,
}
