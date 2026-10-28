import { skipToken, useQuery } from '@tanstack/react-query'

import { getStorage } from '../services/storage/get-storage'

export function useStorageImage(image?: string | null) {
  return useQuery({
    queryKey: ['storage', image],
    queryFn: image ? () => getStorage(image) : skipToken,
  })
}
