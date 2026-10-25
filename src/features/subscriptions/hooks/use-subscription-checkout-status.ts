import { useSubscriptionWorkspaceContext } from './use-subscription-workspace-context'

export function useSubscriptionCheckoutStatus() {
  const { subscriptionWorkspace, pageEntry } = useSubscriptionWorkspaceContext()
  const checkoutStatusTitle = subscriptionWorkspace.isCheckoutConfirmed
    ? 'Novo período confirmado'
    : pageEntry === 'cancel'
      ? 'Checkout interrompido'
      : 'Aguardando confirmação do pagamento'

  const checkoutStatusMessage = subscriptionWorkspace.isCheckoutConfirmed
    ? 'O servidor confirmou o período pago mostrado abaixo.'
    : 'O retorno do Checkout não confirma uma cobrança. O estado abaixo vem da consulta da assinatura; atualize enquanto a confirmação é processada.'

  const isCheckoutStatusVisible =
    pageEntry !== 'default' ||
    Boolean(subscriptionWorkspace.pendingCheckoutOperation)
  const isCheckoutConfirmed = subscriptionWorkspace.isCheckoutConfirmed
  const isRefreshingSubscriptionAccess =
    subscriptionWorkspace.subscriptionAccessQuery.isFetching
  const refreshSubscriptionAccess =
    subscriptionWorkspace.refreshSubscriptionAccess

  return {
    isCheckoutStatusVisible,
    isCheckoutConfirmed,
    checkoutStatusTitle,
    checkoutStatusMessage,
    isRefreshingSubscriptionAccess,
    refreshSubscriptionAccess,
  }
}
