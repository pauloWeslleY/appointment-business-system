import type {
  SubscriptionContext,
  SubscriptionSnapshot,
} from '../types/subscription.model'

export const subscriptionStatusLabel: Record<
  SubscriptionSnapshot['access']['status'],
  string
> = {
  payment_required: 'Contratação necessária',
  trialing: 'Teste gratuito em andamento',
  trial_expired: 'Teste gratuito encerrado',
  active: 'Assinatura ativa',
  grace: 'Pagamento pendente — em tolerância',
  cancellation_scheduled: 'Cancelamento agendado',
  cancelled: 'Assinatura encerrada',
  suspended: 'Acesso em somente leitura',
}

export function canManageSubscription(
  context: SubscriptionContext,
  snapshot: SubscriptionSnapshot,
  action: string,
): boolean {
  const granted = context.permissions.some(
    (permission) =>
      permission.resource === 'subscription' && permission.action === action,
  )
  const contractor = snapshot.subscription?.contractorUserId

  return (
    granted &&
    snapshot.access.canManageSubscription &&
    (!contractor || contractor === context.user.id)
  )
}

export function formatSubscriptionDate(value: string | null): string {
  if (!value) {
    return 'Não informado'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value))
}

export function subscriptionRedirectUrl(value: string): string {
  const url = new URL(value)
  const stripe =
    url.protocol === 'https:' &&
    (url.hostname === 'stripe.com' || url.hostname.endsWith('.stripe.com'))
  const local =
    url.protocol === 'http:' &&
    (url.hostname === 'localhost' || url.hostname === '127.0.0.1')

  if (!stripe && !local) {
    throw new Error(
      'Endereço de pagamento inválido. Atualize a assinatura antes de continuar.',
    )
  }

  return url.toString()
}
