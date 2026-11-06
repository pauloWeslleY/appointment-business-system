import { useQuery } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { authenticationSessionQueryOptions } from '../queries/authentication.query-options'

const appRoute = getRouteApi('/_app')

export function useRefreshSessionContext(): boolean {
  const { session } = appRoute.useRouteContext()
  const router = useRouter()
  const sessionQuery = useQuery(authenticationSessionQueryOptions())
  const hasSessionChanged =
    sessionQuery.isSuccess && sessionQuery.data !== session

  useEffect(() => {
    if (hasSessionChanged) {
      void router.invalidate()
    }
  }, [hasSessionChanged, router])

  return hasSessionChanged
}
