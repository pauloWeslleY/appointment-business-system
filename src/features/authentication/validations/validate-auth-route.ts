import type { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import type { AuthenticationSessionType } from '@/shared/types/auth-client.type'

import { authenticationSessionQueryOptions } from '../queries/authentication.query-options'
import { validatePanelAccess } from './validate-panel-access'

export const validateEnsureSessionRoute = async (
  queryClient: QueryClient,
  pathname?: string,
): Promise<AuthenticationSessionType> => {
  const data = await queryClient.query(authenticationSessionQueryOptions())

  if (!data?.session?.token || !data?.user?.id) {
    if (pathname?.startsWith('/subscription')) {
      sessionStorage.setItem('subscription-login-return', pathname)
    }
    throw redirect({ to: '/login', replace: true })
  }

  return data
}

export const validateEnsureAuthRoute = async (
  queryClient: QueryClient,
  pathname?: string,
): Promise<AuthenticationSessionType> => {
  const data = await validateEnsureSessionRoute(queryClient, pathname)
  const access = await validatePanelAccess(queryClient, data)
  const pathsOrganizationProfile = new Set<string>([
    '/organization-profile',
    '/organization-profile/',
  ])

  const isOrganizationSetup = pathsOrganizationProfile.has(pathname ?? '')

  if (
    !access.canAccessAdmin &&
    access.canStartBusinessOnboarding &&
    !isOrganizationSetup
  ) {
    throw redirect({
      to: '/organization-profile',
      replace: true,
    })
  }

  return data
}
