type Result<T> = { success: true; data: T } | { success: false; error: string }

export function createSlug(value: string): Result<string> {
  if (typeof value !== 'string' || !value.trim()) {
    return {
      success: false,
      error: 'O nome para gerar o slug é obrigatório.',
    }
  }

  const slug = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (!slug) {
    return {
      success: false,
      error: 'Não foi possível gerar um slug válido.',
    }
  }

  return {
    success: true,
    data: slug,
  }
}
