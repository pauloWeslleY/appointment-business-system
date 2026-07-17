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
