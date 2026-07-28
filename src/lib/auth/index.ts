import { createAuthClient } from 'better-auth/react'
import { emailOTPClient, magicLinkClient } from 'better-auth/client/plugins'

if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not defined in the environment variables.')
}

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [magicLinkClient(), emailOTPClient()],
})
