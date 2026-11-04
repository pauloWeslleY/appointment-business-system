import z from 'zod'

const requiredText = (label: string) =>
  z
    .string({ error: `${label} deve ser informado` })
    .trim()
    .min(1, `${label} deve ser informado`)

export const AddressFormDataSchema = z.object({
  countryCode: requiredText('O código do país')
    .toUpperCase()
    .regex(/^BR$/, 'O código do país deve ser BR'),

  postalCode: requiredText('O CEP')
    .regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido')
    .transform((value) => value.replace('-', '')),

  state: requiredText('A UF')
    .toUpperCase()
    .regex(
      /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/,
      'Informe uma UF válida',
    ),

  city: requiredText('A cidade').max(150, 'Use no máximo 150 caracteres'),

  neighborhood: requiredText('O bairro').max(
    150,
    'Use no máximo 150 caracteres',
  ),

  street: requiredText('O logradouro').max(200, 'Use no máximo 200 caracteres'),

  number: requiredText('O número').max(
    20,
    'Use no máximo 20 caracteres ou informe S/N',
  ),

  complement: z
    .string({ error: 'O complemento deve ser um texto' })
    .trim()
    .max(200, 'Use no máximo 200 caracteres')
    .optional(),

  latitude: z
    .number({ error: 'Informe uma latitude numérica válida' })
    .min(-90, 'A latitude mínima é -90')
    .max(90, 'A latitude máxima é 90')
    .nullable(),

  longitude: z
    .number({ error: 'Informe uma longitude numérica válida' })
    .min(-180, 'A longitude mínima é -180')
    .max(180, 'A longitude máxima é 180')
    .nullable(),
})
