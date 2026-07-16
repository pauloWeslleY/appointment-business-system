import type { MutationKey, QueryKey } from '@tanstack/react-query'

export const bookingQueryKeys = {
  all: (): QueryKey => ['booking'] as const,
  lists: (): QueryKey => [...bookingQueryKeys.all(), 'list'] as const,
  establishment: (query?: {
    establishmentId: string
    from: string
    to: string
  }): QueryKey => {
    return [
      ...bookingQueryKeys.all(),
      'establishment',
      {
        establishmentId: query?.establishmentId ?? null,
        from: query?.from ?? null,
        to: query?.to ?? null,
      },
    ] as const
  },
}

export const bookingMutationKeys = {
  create: (): MutationKey => ['create-booking'] as const,
  update: (): MutationKey => ['update-booking'] as const,
}
