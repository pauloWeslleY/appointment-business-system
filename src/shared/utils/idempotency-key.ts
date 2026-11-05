import { v7 as uuidv7 } from 'uuid'

import { cookie } from '../cache/cookie'

export const IDEMPOTENCY_KEY_NAME = 'idempotency-key' as const

export const generateIdempotencyKey = () => uuidv7()

export const headerIdempotencyKey = (key: string) => ({
  [IDEMPOTENCY_KEY_NAME]: key,
})

export const idempotencyKeyStorage = {
  getKey: () => cookie.get(IDEMPOTENCY_KEY_NAME),
  setKey: (value: string) => cookie.set(IDEMPOTENCY_KEY_NAME, value),
  deleteKey: () => cookie.delete(IDEMPOTENCY_KEY_NAME),
}
