import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

import { NotFoundError } from '@/shared/errors'

import { subscriptionRedirectUrl } from '../policies/subscription-view'
import { subscriptionMutationOptions } from '../queries/subscription.mutation-options'
import { subscriptionQueryKey } from '../queries/subscription.query-key'
import {
  subscriptionAccessQueryOptions,
  subscriptionNoticesQueryOptions,
} from '../queries/subscription.query-options'
import {
  checkoutConfirmed,
  createSubscriptionOperationStore,
} from '../services/subscription-operation-store'
import type { SubscriptionContext } from '../types/subscription.model'
import type { SubscriptionCommandResult } from '../types/subscription-api.type'
import type { SubscriptionAction } from '../types/subscription-command.type'

export function useSubscriptionWorkspace(
  authenticatedSubscriptionContext: SubscriptionContext,
  isCheckoutReturn: boolean,
) {
  const organizationId = authenticatedSubscriptionContext.organization.id
  const userId = authenticatedSubscriptionContext.user.id
  const queryClient = useQueryClient()

  const [checkoutPollingStartedAt] = useState(() => Date.now())
  const [subscriptionOperationStore] = useState(() =>
    createSubscriptionOperationStore(
      window.sessionStorage,
      userId,
      organizationId,
      () => crypto.randomUUID(),
    ),
  )
  const [pendingCheckoutOperation, setPendingCheckoutOperation] = useState(() =>
    subscriptionOperationStore.pendingCheckout(),
  )
  const subscriptionAccessQueryKey = subscriptionQueryKey.access(
    userId,
    organizationId,
  )
  const isWorkspaceMounted = useRef(true)
  useEffect(() => {
    isWorkspaceMounted.current = true
    return () => {
      isWorkspaceMounted.current = false
    }
  }, [])

  const subscriptionAccessQuery = useQuery({
    ...subscriptionAccessQueryOptions(userId, organizationId),
    refetchInterval: () =>
      isCheckoutReturn && Date.now() - checkoutPollingStartedAt < 60_000
        ? 5_000
        : false,
  })

  const isCheckoutConfirmed = subscriptionAccessQuery.data
    ? checkoutConfirmed(subscriptionAccessQuery.data, pendingCheckoutOperation)
    : false

  useEffect(() => {
    if (isCheckoutConfirmed && pendingCheckoutOperation) {
      subscriptionOperationStore.complete(pendingCheckoutOperation.operationKey)
      subscriptionOperationStore.clearCheckout()
    }
  }, [
    isCheckoutConfirmed,
    pendingCheckoutOperation,
    subscriptionOperationStore,
  ])

  const startTrialMutation = useMutation(subscriptionMutationOptions.trial())
  const checkoutSessionMutation = useMutation(
    subscriptionMutationOptions.checkout(),
  )
  const billingPortalMutation = useMutation(
    subscriptionMutationOptions.portal(),
  )
  const cancelSubscriptionMutation = useMutation(
    subscriptionMutationOptions.cancel(),
  )
  const billingIntervalMutation = useMutation(
    subscriptionMutationOptions.changeInterval(),
  )

  const executeSubscriptionCommand = async (
    subscriptionAction: SubscriptionAction,
  ): Promise<SubscriptionCommandResult> => {
    const subscriptionSnapshot = subscriptionAccessQuery.data

    if (!subscriptionSnapshot) {
      throw new Error('Atualize a assinatura antes de continuar.')
    }

    if (subscriptionAction.type === 'trial') {
      await startTrialMutation.mutateAsync(organizationId)
      return {
        message: 'Teste gratuito iniciado. Consulte a data de término abaixo.',
      }
    }

    const operationKey =
      'interval' in subscriptionAction
        ? `${subscriptionAction.type}:${subscriptionAction.interval}`
        : subscriptionAction.type
    const requestId = subscriptionOperationStore.requestId(operationKey)

    if (subscriptionAction.type === 'checkout') {
      // Persist before sending so a lost response reuses the same operation.
      subscriptionOperationStore.startCheckout(
        subscriptionSnapshot,
        requestId,
        operationKey,
      )
      setPendingCheckoutOperation(subscriptionOperationStore.pendingCheckout())
      const commandResponse = await checkoutSessionMutation.mutateAsync({
        organizationId,
        interval: subscriptionAction.interval,
        requestId,
      })
      return {
        message: 'Abrindo pagamento seguro.',
        redirect: subscriptionRedirectUrl(commandResponse.checkoutUrl),
      }
    }

    if (subscriptionAction.type === 'portal') {
      const commandResponse = await billingPortalMutation.mutateAsync({
        organizationId,
        requestId,
      })
      subscriptionOperationStore.complete(operationKey)
      return {
        message: 'Abrindo cartão e faturas.',
        redirect: subscriptionRedirectUrl(commandResponse.portalUrl),
      }
    }

    if (subscriptionAction.type === 'cancel') {
      await cancelSubscriptionMutation.mutateAsync({
        organizationId,
        requestId,
      })
      subscriptionOperationStore.complete(operationKey)
      return {
        message: 'Cancelamento agendado para o término do período pago.',
      }
    }

    await billingIntervalMutation.mutateAsync({
      organizationId,
      interval: subscriptionAction.interval,
      requestId,
    })
    subscriptionOperationStore.complete(operationKey)
    return {
      message:
        'Modalidade programada para a próxima renovação, sem cobrança proporcional imediata.',
    }
  }

  const subscriptionCommandMutation = useMutation({
    ...subscriptionMutationOptions.command(
      executeSubscriptionCommand,
      userId,
      organizationId,
    ),
    onSuccess: async (commandResponse) => {
      if (!isWorkspaceMounted.current) {
        return
      }
      await queryClient.invalidateQueries({
        queryKey: subscriptionAccessQueryKey,
      })

      if (isWorkspaceMounted.current && commandResponse.redirect) {
        window.location.assign(commandResponse.redirect)
      }
    },
  })

  const shouldShowSubscriptionNotices = Boolean(
    subscriptionAccessQuery.data &&
    (!subscriptionAccessQuery.data.subscription ||
      subscriptionAccessQuery.data.subscription.contractorUserId === userId),
  )

  const subscriptionNoticesQuery = useQuery({
    ...subscriptionNoticesQueryOptions(userId, organizationId),
    enabled: shouldShowSubscriptionNotices,
    retry: false,
  })

  const markNoticeReadMutation = useMutation({
    ...subscriptionMutationOptions.readNotice(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: subscriptionQueryKey.notices(userId, organizationId),
      }),
  })

  const areSubscriptionNoticesUnavailable =
    subscriptionNoticesQuery.error instanceof NotFoundError

  const refreshSubscriptionAccess = () => {
    void subscriptionAccessQuery.refetch()
  }

  return {
    subscriptionAccessQuery,
    shouldShowSubscriptionNotices,
    refreshSubscriptionAccess,
    subscriptionCommandMutation,
    subscriptionNoticesQuery,
    markNoticeReadMutation,
    areSubscriptionNoticesUnavailable,
    pendingCheckoutOperation,
    isCheckoutConfirmed,
  }
}
