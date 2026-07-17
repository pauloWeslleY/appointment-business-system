export const appointmentQueryKeys = {
  all: () => ['appointment'] as const,

  lists: () => [...appointmentQueryKeys.all(), 'list'] as const,

  establishment: (query?: {
    establishmentId: string
    from: string
    to: string
  }) => {
    return [
      ...appointmentQueryKeys.all(),
      'establishment',
      {
        establishmentId: query?.establishmentId ?? null,
        from: query?.from ?? null,
        to: query?.to ?? null,
      },
    ] as const
  },
}
