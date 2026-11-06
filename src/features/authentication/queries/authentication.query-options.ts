import { queryOptions } from '@tanstack/react-query'

import { AUTHENTICATION_CACHE_POLICY } from '../constants/authentication-cache'
import { getAuthenticationSession } from '../services/authentication-session.service'
import { authenticationQueryKey } from './authentication.query-key'

export const authenticationSessionQueryOptions = () =>
  queryOptions({
    queryKey: authenticationQueryKey.session(),
    queryFn: ({ signal }) => getAuthenticationSession(signal),
    ...AUTHENTICATION_CACHE_POLICY,
    retry: false,
  })
