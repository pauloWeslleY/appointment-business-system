import { authClient } from '@/lib/auth'

import { useStorageImage } from './use-get-storage-image'

const validateImageUserProfile = (image?: string | null) => {
  if (!image) {
    return null
  }
  const imageGoogleAccount = 'https://lh3.googleusercontent.com'
  const validateGoogleImage = image.startsWith(imageGoogleAccount)
  return !validateGoogleImage ? image : null
}

export function useAccountImage() {
  const { data: session } = authClient.useSession()
  const { data: storageData } = useStorageImage(
    validateImageUserProfile(session?.user?.image),
  )

  return storageData ?? session?.user?.image
}
