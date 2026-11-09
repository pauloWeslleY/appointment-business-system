export const LANDING_HOSTNAME = 'agendros.com.br'
export const ADMIN_HOSTNAME = 'admin.agendros.com.br'
export const ADMIN_ORIGIN = `https://${ADMIN_HOSTNAME}`
export const CUSTOMER_ORIGIN = 'https://cliente.agendros.com.br'

export function isLandingHostname(hostname: string): boolean {
  return hostname === LANDING_HOSTNAME || hostname === `www.${LANDING_HOSTNAME}`
}

export function getLandingHref(): string {
  if (window.location.hostname === ADMIN_HOSTNAME) {
    return `https://${LANDING_HOSTNAME}/`
  }

  return '/'
}

export function getCustomerHref(): string {
  const hostname = window.location.hostname

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${window.location.protocol}//${hostname}:3000/`
  }

  return `${CUSTOMER_ORIGIN}/`
}

export function getAdminHref(path: '/login' | '/register'): string {
  if (isLandingHostname(window.location.hostname)) {
    return `${ADMIN_ORIGIN}${path}`
  }

  return path
}
