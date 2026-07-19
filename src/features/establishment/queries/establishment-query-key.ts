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

  listSelectHours: (params: {
    establishmentId?: string
    serviceId?: string
    selectedDay?: Date
  }) => {
    return [
      ...establishmentQueryKeys.all,
      {
        selectedDay: params.selectedDay ?? null,
        serviceId: params.serviceId ?? null,
        establishmentId: params.establishmentId ?? null,
      },
      'list-select-hours',
    ] as const
  },
}
