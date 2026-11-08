import type { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import { takeSubscriptionLoginReturn } from '@/features/subscriptions/services/subscription-login-return'

import { authenticationSessionQueryOptions } from '../queries/authentication.query-options'
import { validatePanelAccess } from './validate-panel-access'

export const authGuardUserAuthenticated = async (queryClient: QueryClient) => {
  const data = await queryClient.query(authenticationSessionQueryOptions())

  if (data) {
    const access = await validatePanelAccess(queryClient, data)

    if (!access.canAccessAdmin && access.canStartBusinessOnboarding) {
      throw redirect({ to: '/organization-profile', replace: true })
    }

    const returnTo = takeSubscriptionLoginReturn(sessionStorage)
    throw redirect({ to: returnTo ?? '/establishment', replace: true })
  }
}
