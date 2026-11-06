import { makeSessionStorage } from '@/shared/cache/session-storage'

const STORAGE_KEY = 'establishment:storage'

export interface StorageCreateEstablishmentProps {
  id: string
  slug: string
  created: boolean
}

export const storageEstablishment =
  makeSessionStorage<StorageCreateEstablishmentProps | null>(STORAGE_KEY)
