export const LANDING_HOSTNAME = 'agendros.com.br'
export const ADMIN_HOSTNAME = 'admin.agendros.com.br'
export const ADMIN_ORIGIN = `https://${ADMIN_HOSTNAME}`
export const CUSTOMER_ORIGIN = 'https://cliente.agendros.com.br'

export function getCustomerHref(): string {
  const hostname = window.location.hostname

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${window.location.protocol}//${hostname}:3000/`
  }

  return `${CUSTOMER_ORIGIN}/`
}

export function getAdminHref(path: '/login' | '/register'): string {
  if (window.location.hostname === LANDING_HOSTNAME) {
    return `${ADMIN_ORIGIN}${path}`
  }

  return path
}
