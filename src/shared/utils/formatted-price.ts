export const formatCurrencyInCents = (amount: number) => {
  const price = amount / 100
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formattedPrice.format(price)
}
