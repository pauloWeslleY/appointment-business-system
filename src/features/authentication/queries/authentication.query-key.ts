import { memberQueryKey } from '@/features/members/queries/member.query-key'

export const authenticationQueryKey = {
  all: ['authentication'] as const,

  session: () => [...authenticationQueryKey.all, 'session'] as const,
}

export const authenticatedContextQueryPrefix = () =>
  [...memberQueryKey.context(), 'authenticated'] as const

export const authenticatedContextQueryKey = (
  userId: string,
  organizationId?: string | null,
) =>
  [
    ...authenticatedContextQueryPrefix(),
    {
      userId: userId || null,
      organizationId: organizationId || null,
    },
  ] as const
