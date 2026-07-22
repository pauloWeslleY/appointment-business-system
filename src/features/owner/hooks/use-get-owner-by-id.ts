import { useQuery } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { ownerQueryKeys } from '../queries/owner-query-key'
import { getOwnerByUserIdService } from '../services/owner.service'

export const useGetOwnerById = () => {
  const { data } = authClient.useSession()

  return useQuery({
    queryKey: ownerQueryKeys.user(data?.user?.id),
    queryFn: () => getOwnerByUserIdService(data?.user?.id),
    enabled: !!data?.user?.id,
  })
}
