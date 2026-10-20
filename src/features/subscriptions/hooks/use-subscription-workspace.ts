import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { subscriptionRedirectUrl } from '../policies/subscription-view'
import type {
  BillingInterval,
  SubscriptionContext,
} from '../schemas/subscription.schema'
import { subscriptionService } from '../services/subscription.service'
import { SubscriptionApiError } from '../services/subscription-client'
import {
  checkoutConfirmed,
  createSubscriptionOperationStore,
} from '../services/subscription-operation-store'

export type SubscriptionAction =
  | { type: 'trial' }
  | { type: 'cancel' }
  | { type: 'portal' }
  | { type: 'checkout'; interval: BillingInterval }
  | { type: 'interval'; interval: BillingInterval }

export function useSubscriptionWorkspace(
  context: SubscriptionContext,
  returning: boolean,
) {
  const organizationId = context.organization.id
  const userId = context.user.id
  const queryClient = useQueryClient()
  const [pollStartedAt] = useState(() => Date.now())
  const [store] = useState(() =>
    createSubscriptionOperationStore(
      window.sessionStorage,
      userId,
      organizationId,
      () => crypto.randomUUID(),
    ),
  )
  const [pendingCheckout, setPendingCheckout] = useState(() =>
    store.pendingCheckout(),
  )
  const queryKey = ['subscription', 'access', userId, organizationId]
  const access = useQuery({
    queryKey,
    queryFn: ({ signal }) => subscriptionService.access(organizationId, signal),
    retry: false,
    refetchOnWindowFocus: true,
    refetchInterval: () =>
      returning && Date.now() - pollStartedAt < 60_000 ? 5_000 : false,
  })
  const confirmed = access.data
    ? checkoutConfirmed(access.data, pendingCheckout)
    : false
  useEffect(() => {
    if (confirmed && pendingCheckout) {
      store.complete(pendingCheckout.operationKey)
      store.clearCheckout()
    }
  }, [confirmed, pendingCheckout, store])
  const command = useMutation({
    mutationFn: async (
      action: SubscriptionAction,
    ): Promise<{ message: string; redirect?: string }> => {
      const snapshot = access.data

      if (!snapshot) {
        throw new Error('Atualize a assinatura antes de continuar.')
      }

      if (action.type === 'trial') {
        await subscriptionService.trial(organizationId)
        return {
          message:
            'Teste gratuito iniciado. Consulte a data de término abaixo.',
        }
      }

      const key =
        'interval' in action ? `${action.type}:${action.interval}` : action.type
      const requestId = store.requestId(key)

      if (action.type === 'checkout') {
        // Persist before sending so a lost response reuses the same operation.
        store.startCheckout(snapshot, requestId, key)
        setPendingCheckout(store.pendingCheckout())
        const result = await subscriptionService.checkout(
          organizationId,
          action.interval,
          requestId,
        )
        return {
          message: 'Abrindo pagamento seguro.',
          redirect: subscriptionRedirectUrl(result.checkoutUrl),
        }
      }

      if (action.type === 'portal') {
        const result = await subscriptionService.portal(
          organizationId,
          requestId,
        )
        store.complete(key)
        return {
          message: 'Abrindo cartão e faturas.',
          redirect: subscriptionRedirectUrl(result.portalUrl),
        }
      }

      if (action.type === 'cancel') {
        await subscriptionService.cancel(organizationId, requestId)
        store.complete(key)
        return {
          message: 'Cancelamento agendado para o término do período pago.',
        }
      }

      await subscriptionService.changeInterval(
        organizationId,
        action.interval,
        requestId,
      )
      store.complete(key)
      return {
        message:
          'Modalidade programada para a próxima renovação, sem cobrança proporcional imediata.',
      }
    },
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({ queryKey })

      if (result.redirect) {
        window.location.assign(result.redirect)
      }
    },
  })
  const notices = useQuery({
    queryKey: ['subscription', 'notices', userId, organizationId],
    queryFn: ({ signal }) =>
      subscriptionService.notices(organizationId, signal),
    enabled: Boolean(
      access.data &&
      (!access.data.subscription ||
        access.data.subscription.contractorUserId === userId),
    ),
    retry: false,
  })
  const readNotice = useMutation({
    mutationFn: (deliveryId: string) =>
      subscriptionService.readNotice(organizationId, deliveryId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['subscription', 'notices', userId, organizationId],
      }),
  })
  const noticesUnavailable =
    notices.error instanceof SubscriptionApiError &&
    notices.error.status === 404

  return {
    access,
    command,
    notices,
    readNotice,
    noticesUnavailable,
    pendingCheckout,
    confirmed,
  }
}
