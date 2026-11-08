import type { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import { authenticationSessionQueryOptions } from '../queries/authentication.query-options'
import type { AuthenticationSession } from '../types/authentication-session.type'
import { validatePanelAccess } from './validate-panel-access'

export const validateEnsureAuthRoute = async (
  queryClient: QueryClient,
  pathname?: string,
): Promise<AuthenticationSession> => {
  const data = await queryClient.query(authenticationSessionQueryOptions())

  if (!data?.session?.token || !data?.user?.id) {
    if (pathname?.startsWith('/subscription')) {
      sessionStorage.setItem('subscription-login-return', pathname)
    }
    throw redirect({ to: '/login', replace: true })
  }

  const access = await validatePanelAccess(queryClient, data)
  const isOrganizationSetup =
    pathname === '/organization-profile' ||
    pathname === '/organization-profile/'

  if (
    !access.canAccessAdmin &&
    access.canStartBusinessOnboarding &&
    !isOrganizationSetup
  ) {
    throw redirect({ to: '/organization-profile', replace: true })
  }

  return data
}
