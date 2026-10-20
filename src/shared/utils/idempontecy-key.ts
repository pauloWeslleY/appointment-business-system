import { v7 as uuidv7 } from 'uuid'

import { cookie } from '../cache/cookie'

export const idempontecyKey = 'idempotency-key' as const

export const generateIdempontecyKey = () => uuidv7()

export const headerIdempontecyKey = (idempontecy: string) => ({
  [idempontecyKey]: idempontecy,
})

export const idempontecy = {
  getKey: () => cookie.get(idempontecyKey),
  setKey: (value: string) => cookie.set(idempontecyKey, value),
  deleteKey: () => cookie.delete(idempontecyKey),
}
