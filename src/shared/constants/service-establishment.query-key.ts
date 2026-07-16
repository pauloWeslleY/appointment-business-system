import type { MutationKey } from '@tanstack/react-query'

export const serviceEstablishmentQueryKeys = {
  all: ['service-establishment'] as const,
  lists: () => [...serviceEstablishmentQueryKeys.all, 'list'] as const,
  owner: (ownerId?: string) => {
    return [
      ...serviceEstablishmentQueryKeys.lists(),
      { ownerId: ownerId ?? null },
    ] as const
  },
  detail: (establishmentId?: string) => {
    return [
      ...serviceEstablishmentQueryKeys.all,
      { establishmentId: establishmentId ?? null },
      'detail',
    ] as const
  },
  info: (serviceEstablishmentId?: string) => {
    return [
      ...serviceEstablishmentQueryKeys.all,
      { serviceEstablishmentId: serviceEstablishmentId ?? null },
      'info',
    ] as const
  },
  getById: (serviceEstablishmentId?: string) => {
    return [
      ...serviceEstablishmentQueryKeys.all,
      { serviceEstablishmentId: serviceEstablishmentId ?? null },
      'by-id',
    ] as const
  },
}

export const serviceEstablishmentMutationKeys = {
  create: (): MutationKey => ['create-service-establishment'] as const,
  update: (): MutationKey => ['update-service-establishment'] as const,
  delete: (): MutationKey => ['delete-service-establishment'] as const,
}
