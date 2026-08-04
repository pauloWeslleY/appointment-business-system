import { FormatMask } from '../utils/formatted-mask'

interface LabelFormPhonesMaskProps {
  title: string
  label: string
  placeholder: string
}

export const maplabelFormPhonesMask = (mask: string) => {
  const phonesLabel: Record<string, LabelFormPhonesMaskProps> = {
    [FormatMask.TELEPHONE]: {
      title: 'Telefone fixo',
      label: 'Telefone',
      placeholder: '(00) 0000-0000',
    },
    [FormatMask.CELLPHONE]: {
      title: 'Celular',
      label: 'Celular',
      placeholder: '(00) 00000-0000',
    },
  } as const

  return phonesLabel[mask] || phonesLabel[FormatMask.TELEPHONE]
}
