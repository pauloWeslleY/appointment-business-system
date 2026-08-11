import { useQuery } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { ownerByUserIdQueryOptions } from '../queries/owner-query-options'

export const useGetOwnerById = () => {
  const { data } = authClient.useSession()
  return useQuery(ownerByUserIdQueryOptions(data?.user?.id))
}
