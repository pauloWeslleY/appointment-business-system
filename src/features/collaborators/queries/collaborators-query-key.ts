export const collaboratorsQueryKeys = {
  all: ['collaborators'] as const,

  lists: () => [...collaboratorsQueryKeys.all, 'list'] as const,

  inactive: () => [...collaboratorsQueryKeys.lists(), 'inactive'] as const,

  detail: (collaboratorId?: string) =>
    [...collaboratorsQueryKeys.all, 'detail', collaboratorId ?? null] as const,

  establishment: (establishmentId?: string) =>
    [
      ...collaboratorsQueryKeys.lists(),
      'establishment',
      establishmentId ?? null,
    ] as const,
}
