import dayjs from 'dayjs'

const ISO_DATE_FORMAT = 'YYYY-MM-DD'

// Data local do navegador, no mesmo formato enviado pelo seletor de data.
export function getTodayIsoDate(): string {
  return dayjs().format(ISO_DATE_FORMAT)
}

// Datas ISO (YYYY-MM-DD) podem ser comparadas como texto.
export function isFutureBirthDate(birthDate: string): boolean {
  return birthDate > getTodayIsoDate()
}
