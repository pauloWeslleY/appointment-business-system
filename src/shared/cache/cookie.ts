export function setCookie(name: string, value: string, days = 7): void {
  const maxAge = days * 24 * 60 * 60
  const cookieSettings = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `Max-Age=${maxAge}`,
    'Path=/',
    'SameSite=Lax',
  ]

  document.cookie = cookieSettings.join('; ')
}

export function getCookie(name: string): string | null {
  const encodedName = encodeURIComponent(name)

  const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${encodedName}=`))

  if (!cookie) return null

  const cookieValue = cookie.slice(encodedName.length + 1)
  return decodeURIComponent(cookieValue)
}

export function deleteCookie(name: string): void {
  document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=/; SameSite=Lax`
}

export const cookie = {
  set: setCookie,
  get: getCookie,
  delete: deleteCookie,
}
