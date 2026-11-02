export const googleCalendarQueryKeys = {
  all: ['google-calendar'] as const,

  connection: (establishmentId?: string) =>
    [...googleCalendarQueryKeys.all, 'connection', establishmentId] as const,
} as const
