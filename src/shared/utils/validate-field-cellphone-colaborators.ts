import { FormatMask } from './formatted-mask'

export const validNumberPhone = (telephone: string) => {
  const numbers = telephone.replace(/\D/g, '')
  if (!numbers) return FormatMask.TELEPHONE
  return numbers.length > 10 ? FormatMask.CELLPHONE : FormatMask.TELEPHONE
}
