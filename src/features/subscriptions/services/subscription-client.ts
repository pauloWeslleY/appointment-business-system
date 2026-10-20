import { z } from 'zod'

import {
  type BillingInterval,
  noticesSchema,
  organizationSchema,
  subscriptionContextSchema,
  subscriptionSchema,
} from '../schemas/subscription.schema.ts'

export interface SubscriptionRequest {
  method: 'GET' | 'POST' | 'PATCH'
  body?: unknown
  headers?: Record<string, string>
  signal?: AbortSignal
}

export type SubscriptionTransport = (
  path: string,
  request: SubscriptionRequest,
) => Promise<{ status: number; body: unknown }>

export class SubscriptionApiError extends Error {
  readonly status: number
  readonly code: string

  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

export function createSubscriptionClient(transport: SubscriptionTransport) {
  async function request<T>(
    path: string,
    options: SubscriptionRequest,
    schema: z.ZodType<T>,
  ): Promise<T> {
    const response = await transport(path, options)

    if (response.status < 200 || response.status >= 300) {
      const error = z
        .object({ code: z.string().optional(), message: z.string().optional() })
        .safeParse(response.body)
      throw new SubscriptionApiError(
        response.status,
        error.success
          ? (error.data.code ?? 'SUBSCRIPTION_REQUEST_FAILED')
          : 'SUBSCRIPTION_REQUEST_FAILED',
        error.success
          ? (error.data.message ?? 'Não foi possível concluir a solicitação.')
          : 'Não foi possível concluir a solicitação.',
      )
    }

    return schema.parse(response.body)
  }

  const scope = (organizationId: string) => ({
    'x-organization-id': organizationId,
  })
  const commandHeaders = (organizationId: string, requestId: string) => ({
    ...scope(organizationId),
    'idempotency-key': z.uuid().parse(requestId),
  })

  return {
    organizations: (signal?: AbortSignal) =>
      request(
        '/api/auth/organization/list',
        { method: 'GET', signal },
        z.array(organizationSchema),
      ),
    context: async (organizationId: string, signal?: AbortSignal) => {
      const context = await request(
        '/me/context',
        { method: 'GET', signal },
        subscriptionContextSchema,
      )

      if (context.organization.id !== organizationId) {
        throw new SubscriptionApiError(
          409,
          'ORGANIZATION_CHANGED',
          'A organização ativa mudou. Atualize a página antes de continuar.',
        )
      }

      return context
    },
    selectOrganization: (organizationId: string) =>
      request(
        '/me/context',
        { method: 'POST', body: { organizationId } },
        subscriptionContextSchema,
      ),
    access: (organizationId: string, signal?: AbortSignal) =>
      request(
        '/admin/subscriptions',
        { method: 'GET', headers: scope(organizationId), signal },
        subscriptionSchema,
      ),
    trial: (organizationId: string) =>
      request(
        '/admin/subscriptions/trial',
        { method: 'POST', headers: scope(organizationId) },
        z.object({ trial: z.object({ used: z.boolean() }) }),
      ),
    checkout: (
      organizationId: string,
      interval: BillingInterval,
      requestId: string,
    ) =>
      request(
        '/admin/subscriptions/checkout',
        {
          method: 'POST',
          headers: commandHeaders(organizationId, requestId),
          body: { billingInterval: interval },
        },
        z.object({ checkoutUrl: z.url(), checkoutSessionId: z.string() }),
      ),
    cancel: (organizationId: string, requestId: string) =>
      request(
        '/admin/subscriptions/cancel',
        { method: 'POST', headers: commandHeaders(organizationId, requestId) },
        z.object({
          cancellationScheduled: z.boolean(),
          effectiveAt: z.iso.datetime({ offset: true }),
        }),
      ),
    changeInterval: (
      organizationId: string,
      interval: BillingInterval,
      requestId: string,
    ) =>
      request(
        '/admin/subscriptions/billing-interval',
        {
          method: 'PATCH',
          headers: commandHeaders(organizationId, requestId),
          body: { billingInterval: interval },
        },
        z.object({
          billingInterval: z.enum(['monthly', 'annual']),
          effectiveAt: z.iso.datetime({ offset: true }),
        }),
      ),
    portal: (organizationId: string, requestId: string) =>
      request(
        '/admin/subscriptions/portal',
        { method: 'POST', headers: commandHeaders(organizationId, requestId) },
        z.object({ portalUrl: z.url() }),
      ),
    notices: (organizationId: string, signal?: AbortSignal) =>
      request(
        '/admin/subscriptions/notices',
        { method: 'GET', headers: scope(organizationId), signal },
        noticesSchema,
      ),
    readNotice: (organizationId: string, deliveryId: string) =>
      request(
        `/admin/subscriptions/notices/${z.uuid().parse(deliveryId)}/read`,
        { method: 'PATCH', headers: scope(organizationId) },
        z.object({ read: z.boolean() }),
      ),
  }
}
