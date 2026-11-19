import {
  hasPasswordMinimumLength,
  hasPasswordNumber,
  hasPasswordSymbol,
  hasPasswordUppercaseLetter,
} from '@/shared/helpers/password-rules'

export const passwordCriteria = [
  {
    label: 'Pelo menos 12 caracteres',
    validate: hasPasswordMinimumLength,
  },
  {
    label: 'Letras maiúsculas e minúsculas',
    validate: hasPasswordUppercaseLetter,
  },
  {
    label: 'Pelo menos um número',
    validate: hasPasswordNumber,
  },
  {
    label: 'Pelo menos um símbolo',
    validate: hasPasswordSymbol,
  },
]
