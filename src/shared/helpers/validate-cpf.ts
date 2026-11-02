export function validateCPF(valor: string): boolean {
  if (typeof valor !== 'string') return false

  const entrada = valor.trim()

  if (!/^(?:\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(entrada)) {
    return false
  }

  const cpf = entrada.replace(/\D/g, '')

  if (/^(\d)\1{10}$/.test(cpf)) return false

  for (let tamanho = 9; tamanho <= 10; tamanho++) {
    let soma = 0

    for (let i = 0; i < tamanho; i++) {
      soma += Number(cpf[i]) * (tamanho + 1 - i)
    }

    const resto = soma % 11
    const digito = resto < 2 ? 0 : 11 - resto

    if (Number(cpf[tamanho]) !== digito) return false
  }

  return true
}
