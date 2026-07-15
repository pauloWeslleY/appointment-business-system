import { useQuery } from '@tanstack/react-query'

import { authClient } from '../auth'
import { ownerQueryKeys } from '../constants/owner.query-key'
import { getOwnerByUserIdService } from '../services/owner/owner.service'

const useGetOwnerById = () => {
  const { data } = authClient.useSession()

  return useQuery({
    queryKey: ownerQueryKeys.user(data?.user?.id),
    queryFn: () => getOwnerByUserIdService(data?.user?.id),
    enabled: !!data?.user?.id,
  })
}

export default useGetOwnerById
