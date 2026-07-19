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
