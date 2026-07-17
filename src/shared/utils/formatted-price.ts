export const formatCurrencyInCents = (amount: number) => {
  const price = amount / 100

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}
