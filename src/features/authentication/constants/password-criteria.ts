export const passwordCriteria = [
  {
    label: 'Pelo menos 12 caracteres',
    validate: (value: string) => value.length >= 12,
  },
  {
    label: 'Letras maiúsculas e minúsculas',
    validate: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value),
  },
  {
    label: 'Pelo menos um número',
    validate: (value: string) => /\d/.test(value),
  },
  {
    label: 'Pelo menos um símbolo',
    validate: (value: string) => /[^a-zA-Z0-9\s]/.test(value),
  },
]
