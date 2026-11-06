import {
  emailOTPClient,
  inferAdditionalFields,
  magicLinkClient,
  organizationClient,
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not defined in the environment variables.')
}

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [
    magicLinkClient(),
    emailOTPClient(),
    organizationClient(),
    inferAdditionalFields({
      user: {
        status: {
          type: ['pending', 'active', 'inactive', 'blocked'],
          required: false,
          input: false,
        },
        lastLoginAt: {
          type: 'date',
          required: false,
          input: false,
        },
      },
    }),
  ],
})
