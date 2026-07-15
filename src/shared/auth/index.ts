import { createAuthClient } from 'better-auth/react'

if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not defined in the environment variables.')
}

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
})
