import {
  formattedCompanyTaxId,
  formattedPersonalTaxId,
} from '@/shared/utils/formatted-mask'

export const TAX_ID_TYPES = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
} as const

export type TaxIdType = (typeof TAX_ID_TYPES)[keyof typeof TAX_ID_TYPES]

export const mapTaxIdType = (value: string, taxIdType?: TaxIdType) => {
  const mapTax: Record<TaxIdType | 'DESCONHECIDO', string> = {
    [TAX_ID_TYPES.CPF]: formattedPersonalTaxId(value),
    [TAX_ID_TYPES.CNPJ]: formattedCompanyTaxId(value),
    DESCONHECIDO: '',
  }

  return (
    mapTax[taxIdType as TaxIdType | 'DESCONHECIDO'] || mapTax['DESCONHECIDO']
  )
}
