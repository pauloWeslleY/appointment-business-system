export const FormatMask = {
  CELLPHONE: '(##) #####-####',
  TELEPHONE: '(##) ####-####',
  TELEPHONE_FIXED: '### (##) ####-####',
  ZIP_CODE: '#####-###',
  PERSONAL_TAX_ID: '###.###.###-##',
  COMPANY_TAX_ID: '##.###.###/####-##',
} as const

type FormatMaskType = (typeof FormatMask)[keyof typeof FormatMask]

export const formatterMask = (value: string, mask: FormatMaskType): string => {
  if (!value || !mask) return '--'
  let i = 0
  const v = value.toString()
  return mask.replace(/#/g, () => v[i++]).replace(/undefined/g, '')
}

export const formattedZipCode = (value?: string): string => {
  if (!value) return 'N/A'
  return formatterMask(value, FormatMask.ZIP_CODE)
}

export const formattedPersonalTaxId = (value: string): string => {
  return formatterMask(value, FormatMask.PERSONAL_TAX_ID)
}

export const formattedCompanyTaxId = (value: string): string => {
  return formatterMask(value, FormatMask.COMPANY_TAX_ID)
}

export const formattedCellphone = (value: string): string => {
  return formatterMask(value, FormatMask.CELLPHONE)
}

export const formattedTelephone = (value: string): string => {
  return formatterMask(value, FormatMask.TELEPHONE)
}

export const formattedPhone = (value: string): string => {
  if (value.length === 10) {
    return formattedTelephone(value)
  }

  if (value.length === 11) {
    return formattedCellphone(value)
  }

  return value
}
