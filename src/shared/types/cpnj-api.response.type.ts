import { z } from 'zod'

export const BusinessActivitySchema = z.object({
  code: z.string(),
  text: z.string(),
})

export const CompanyPartnerSchema = z.object({
  nome: z.string(),
  qual: z.string(),
  pais_origem: z.string(),
  nome_rep_legal: z.string(),
  qual_rep_legal: z.string(),
})

export const TaxRegimeSchema = z.object({
  optante: z.boolean(),
  data_opcao: z.string(),
  data_exclusao: z.string(),
  ultima_atualizacao: z.string(),
})

export const BillingInfoSchema = z.object({
  free: z.boolean(),
  database: z.boolean(),
})

export const CompanyLookupResponseSchema = z.object({
  status: z.string(),
  ultima_atualizacao: z.string(),
  cnpj: z.string(),
  tipo: z.string(),
  porte: z.string(),
  nome: z.string(),
  fantasia: z.string(),
  abertura: z.string(),
  atividade_principal: z.array(BusinessActivitySchema),
  atividades_secundarias: z.array(BusinessActivitySchema),
  natureza_juridica: z.string(),
  logradouro: z.string(),
  numero: z.string(),
  complemento: z.string(),
  cep: z.string(),
  bairro: z.string(),
  municipio: z.string(),
  uf: z.string(),
  email: z.string(),
  telefone: z.string(),
  efr: z.string(),
  situacao: z.string(),
  data_situacao: z.string(),
  motivo_situacao: z.string(),
  situacao_especial: z.string(),
  data_situacao_especial: z.string(),
  capital_social: z.string(),
  qsa: z.array(CompanyPartnerSchema),
  simples: TaxRegimeSchema,
  simei: TaxRegimeSchema,
  billing: BillingInfoSchema,
})

export type CompanyLookupResponse = z.infer<typeof CompanyLookupResponseSchema>
