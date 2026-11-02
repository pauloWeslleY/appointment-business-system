export function validateCNPJ(valor: string): boolean {
  if (typeof valor !== 'string') return false

  const entrada = valor.trim().toUpperCase()

  if (
    !/^(?:[A-Z0-9]{12}\d{2}|[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-\d{2})$/.test(
      entrada,
    )
  ) {
    return false
  }

  const cnpj = entrada.replace(/[./-]/g, '')

  if (/^(\d)\1{13}$/.test(cnpj)) return false

  function calcularDigito(base: string): string {
    let soma = 0
    let peso = 2

    for (let i = base.length - 1; i >= 0; i--) {
      soma += (base.charCodeAt(i) - 48) * peso
      peso = peso === 9 ? 2 : peso + 1
    }

    const resto = soma % 11
    return String(resto < 2 ? 0 : 11 - resto)
  }

  const base = cnpj.slice(0, 12)
  const primeiro = calcularDigito(base)
  const segundo = calcularDigito(base + primeiro)

  return cnpj === base + primeiro + segundo
}
