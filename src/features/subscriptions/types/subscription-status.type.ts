import type { ColorPalette } from '@chakra-ui/react'
import z from 'zod'

export const SubscriptionStatuses = {
  PAYMENT_REQUIRED: 'payment_required',
  TRIALING: 'trialing',
  TRIAL_EXPIRED: 'trial_expired',
  ACTIVE: 'active',
  GRACE: 'grace',
  CANCELLATION_SCHEDULED: 'cancellation_scheduled',
  CANCELLED: 'cancelled',
  SUSPENDED: 'suspended',
} as const

export const SubscriptionStatusesArray = Object.values(SubscriptionStatuses)

export const SubscriptionStatusSchema = z.enum(SubscriptionStatusesArray)

export type SubscriptionStatusType =
  (typeof SubscriptionStatuses)[keyof typeof SubscriptionStatuses]

export const mapLabelSubscriptionStatus: Record<
  SubscriptionStatusType,
  string
> = {
  [SubscriptionStatuses.ACTIVE]: 'Assinatura ativa',
  [SubscriptionStatuses.PAYMENT_REQUIRED]: 'Contratação necessária',
  [SubscriptionStatuses.TRIALING]: 'Teste gratuito em andamento',
  [SubscriptionStatuses.TRIAL_EXPIRED]: 'Teste gratuito encerrado',
  [SubscriptionStatuses.GRACE]: 'Pagamento pendente — em tolerância',
  [SubscriptionStatuses.CANCELLATION_SCHEDULED]: 'Cancelamento agendado',
  [SubscriptionStatuses.CANCELLED]: 'Assinatura encerrada',
  [SubscriptionStatuses.SUSPENDED]: 'Acesso em somente leitura',
}

export const mapLabelSubscriptionStatusColor: Record<
  SubscriptionStatusType,
  ColorPalette
> = {
  [SubscriptionStatuses.ACTIVE]: 'green',
  [SubscriptionStatuses.PAYMENT_REQUIRED]: 'orange',
  [SubscriptionStatuses.TRIALING]: 'blue',
  [SubscriptionStatuses.TRIAL_EXPIRED]: 'orange',
  [SubscriptionStatuses.GRACE]: 'yellow',
  [SubscriptionStatuses.CANCELLATION_SCHEDULED]: 'orange',
  [SubscriptionStatuses.CANCELLED]: 'gray',
  [SubscriptionStatuses.SUSPENDED]: 'red',
}
