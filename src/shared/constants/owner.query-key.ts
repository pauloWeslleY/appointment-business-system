import type { MutationKey, QueryKey } from '@tanstack/react-query'

export const ownerQueryKeys = {
  all: (): QueryKey => ['owner'] as const,
  lists: (): QueryKey => [...ownerQueryKeys.all(), 'list'] as const,
  user: (userId?: string): QueryKey => {
    return [...ownerQueryKeys.all(), { userId: userId ?? null }] as const
  },
}

export const ownerMutationKeys = {
  create: (): MutationKey => ['create-owner'] as const,
  update: (): MutationKey => ['update-owner'] as const,
}
