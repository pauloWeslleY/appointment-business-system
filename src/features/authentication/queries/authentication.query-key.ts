export const authenticationQueryKey = {
  all: ['authentication'] as const,
  session: () => [...authenticationQueryKey.all, 'session'] as const,
  panelAccess: () => [...authenticationQueryKey.all, 'panel-access'] as const,
  panelAccessByContext: (userId: string, organizationId?: string | null) =>
    [
      ...authenticationQueryKey.panelAccess(),
      { userId, organizationId: organizationId ?? null },
    ] as const,
}
