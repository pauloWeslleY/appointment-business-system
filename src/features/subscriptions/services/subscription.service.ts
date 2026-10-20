import { api } from '@/shared/config/api'

import { createSubscriptionClient } from './subscription-client'

export const subscriptionService = createSubscriptionClient(
  async (path, request) => {
    const response = await api.request<unknown>({
      url: path,
      method: request.method,
      data: request.body,
      headers: request.headers,
      signal: request.signal,
      validateStatus: () => true,
    })

    return { status: response.status, body: response.data }
  },
)
