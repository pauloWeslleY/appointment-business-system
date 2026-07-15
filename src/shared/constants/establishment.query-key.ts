import type { MutationKey } from '@tanstack/react-query'

export const establishmentQueryKeys = {
  all: ['establishment'] as const,
  lists: () => [...establishmentQueryKeys.all, 'list'] as const,
  owner: (ownerId?: string) => {
    return [
      ...establishmentQueryKeys.lists(),
      { ownerId: ownerId ?? null },
    ] as const
  },
  detail: (establishmentId?: string) => {
    return [
      ...establishmentQueryKeys.all,
      { establishmentId: establishmentId ?? null },
      'detail',
    ] as const
  },
}

export const establishmentMutationKeys = {
  create: (): MutationKey => ['create-establishment'] as const,
}
