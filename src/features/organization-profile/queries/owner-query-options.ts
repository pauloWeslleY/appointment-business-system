import { queryOptions } from '@tanstack/react-query'

import { getOwnerByUserIdService } from '../services/owner.service'
import { ownerQueryKeys } from './owner-query-key'

export const ownerByUserIdQueryOptions = (userId?: string) => {
  return queryOptions({
    queryKey: ownerQueryKeys.user(userId),
    queryFn: () => getOwnerByUserIdService(userId),
    enabled: !!userId && userId.trim() !== '',
  })
}
