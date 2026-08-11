const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}

const normalizeSlug = (slug: string): string => {
  return slug
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

export const slugServiceEstablishment = (slug: string): string => {
  if (!slug || slug.trim() === '') {
    throw new Error('Slug inválido')
  }

  const normalizedSlug = normalizeSlug(slug)
  if (!isValidSlug(normalizedSlug)) {
    throw new Error('Slug inválido')
  }

  return normalizedSlug
}
