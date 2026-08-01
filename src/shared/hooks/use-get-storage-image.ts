import { useQuery } from '@tanstack/react-query'

import { getStorage } from '../services/storage/get-storage'

export function useStorageImage(imagePath?: string | null) {
  return useQuery({
    queryKey: ['storage', imagePath],
    queryFn: () => getStorage(imagePath ?? ''),
    enabled: !!imagePath,
  })
}
