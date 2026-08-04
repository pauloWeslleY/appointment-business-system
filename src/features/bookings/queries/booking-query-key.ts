export const bookingQueryKeys = {
  all: () => ['booking'] as const,

  lists: () => [...bookingQueryKeys.all(), 'list'] as const,

  services: (query?: { serviceId: string; date?: string | undefined }) => {
    return [
      ...bookingQueryKeys.all(),
      'services',
      {
        serviceId: query?.serviceId || null,
        date: query?.date || null,
      },
    ] as const
  },

  establishment: (query?: {
    establishmentId: string
    from?: string | undefined
    to?: string | undefined
  }) => {
    return [
      ...bookingQueryKeys.all(),
      'establishment',
      {
        establishmentId: query?.establishmentId || null,
        from: query?.from || null,
        to: query?.to || null,
      },
    ] as const
  },
}
