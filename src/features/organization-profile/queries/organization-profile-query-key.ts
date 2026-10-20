export const organizationProfileQueryKeys = {
  all: () => ['organization-profile'] as const,
  summary: () => [...organizationProfileQueryKeys.all()] as const,
}
