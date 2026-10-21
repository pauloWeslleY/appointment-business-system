export const organizationProfileQueryKeys = {
  all: ['organization-profile'] as const,
  summary: () => [...organizationProfileQueryKeys.all, 'summary'] as const,
}

export const organizationQueryKeys = {
  all: ['organizations'] as const,
  select: () => [...organizationQueryKeys.all, 'select'] as const,
  list: () => [...organizationQueryKeys.all, 'list'] as const,
  details: () => [...organizationQueryKeys.all, 'detail'] as const,

  detail: (organizationId?: string) =>
    [...organizationQueryKeys.details(), organizationId] as const,
}
