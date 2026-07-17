export const ownerQueryKeys = {
  all: () => ['owner'] as const,

  lists: () => [...ownerQueryKeys.all(), 'list'] as const,

  user: (userId?: string) => {
    return [...ownerQueryKeys.all(), { userId: userId ?? null }] as const
  },
}
