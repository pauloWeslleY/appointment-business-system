import { useQuery } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { memberContextQueryOptions } from '../queries/member.query-options'
import { useMemberContext } from './use-member-context'

const appRoute = getRouteApi('/_app')

export function useRefreshMemberContext(): boolean {
  const { session } = appRoute.useRouteContext()
  const memberContext = useMemberContext()
  const router = useRouter()
  const contextQuery = useQuery(
    memberContextQueryOptions(session.user.id, memberContext?.organization.id),
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
