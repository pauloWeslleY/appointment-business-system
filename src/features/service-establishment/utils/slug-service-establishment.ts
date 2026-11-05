import { createSlug } from '@/shared/utils/create-slug'

export const createServiceEstablishmentSlug = (name: string): string | null => {
  const slug = createSlug(name)
  return slug.success ? slug.data : null
}
