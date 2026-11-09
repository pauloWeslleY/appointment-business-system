import { useQuery } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { authenticatedContextQueryOptions } from '@/features/authentication/queries/authentication.query-options'

import { useMemberContext } from './use-member-context'

const appRoute = getRouteApi('/_app')

export function useRefreshMemberContext(): boolean {
  const { session } = appRoute.useRouteContext()
  const memberContext = useMemberContext()
  const router = useRouter()

  const contextQuery = useQuery(
    authenticatedContextQueryOptions(
      session.user.id,
      session.session.activeOrganizationId,
    ),
  )

  const hasContextChanged = Boolean(
    memberContext &&
    contextQuery.isSuccess &&
    contextQuery.data !== memberContext,
  )

  useEffect(() => {
    if (hasContextChanged) {
      void router.invalidate()
    }
  }, [hasContextChanged, router])

  return hasContextChanged
}
