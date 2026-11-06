import { ESTABLISHMENT_WEBSITE_BASE } from '../constants/establishment-website'

export function getEstablishmentWebsitePath(value?: string | null): string {
  const website = value?.trim() ?? ''

  if (website === ESTABLISHMENT_WEBSITE_BASE) {
    return '/'
  }

  if (website.startsWith(`${ESTABLISHMENT_WEBSITE_BASE}/`)) {
    return website.slice(ESTABLISHMENT_WEBSITE_BASE.length)
  }

  return website
}

export function buildEstablishmentWebsite(
  value?: string | null,
): string | null {
  const path = getEstablishmentWebsitePath(value)

  if (!path) {
    return null
  }

  return `${ESTABLISHMENT_WEBSITE_BASE}/${path.replace(/^\/+/, '')}`
}
