import { makeSessionStorage } from '@/shared/cache/session-storage'

const STORAGE_KEY = 'establishment:storage'

export const storageEstablishment = makeSessionStorage<{
  id: string
  slug: string
  created: boolean
}>(STORAGE_KEY)
