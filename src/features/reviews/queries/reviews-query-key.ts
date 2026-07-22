export const reviewsQueryKeys = {
  all: () => ['reviews'] as const,
  establishments: (establishmentId?: string) =>
    [...reviewsQueryKeys.all(), 'list', establishmentId ?? null] as const,
}
