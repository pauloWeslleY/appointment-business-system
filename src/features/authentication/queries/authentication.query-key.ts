export const authenticationQueryKey = {
  all: ['authentication'] as const,
  session: () => [...authenticationQueryKey.all, 'session'] as const,
}
