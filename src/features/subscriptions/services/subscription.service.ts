import z from 'zod'

import { BadRequestError, ConflictError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { subscriptionSchema } from '../schemas/subscription.schema.ts'
import {
  subscriptionBillingRequestSchema,
  subscriptionIntervalResponseSchema,
} from '../schemas/subscription-billing.schema'
import { subscriptionCancellationResponseSchema } from '../schemas/subscription-cancellation.schema'
import { subscriptionCheckoutResponseSchema } from '../schemas/subscription-checkout.schema'
import {
  subscriptionContextQuerySchema,
  subscriptionSelectionSchema,
} from '../schemas/subscription-context.schema'
import {
  subscriptionContextSchema,
  subscriptionOrganizationsResponseSchema,
} from '../schemas/subscription-context.schema.ts'
import {
  subscriptionCommandHeadersSchema,
  subscriptionScopeHeadersSchema,
} from '../schemas/subscription-headers.schema'
import {
  subscriptionNoticePathSchema,
  subscriptionReadNoticeResponseSchema,
} from '../schemas/subscription-notices.schema'
import { noticesSchema } from '../schemas/subscription-notices.schema.ts'
import { subscriptionPortalResponseSchema } from '../schemas/subscription-portal.schema'
import { subscriptionTrialResponseSchema } from '../schemas/subscription-trial.schema'
import { type BillingIntervalType } from '../types/billing-interval.type'
import { type SubscriptionSnapshot } from '../types/subscription.model'
import type {
  SubscriptionCancellationResponse,
  SubscriptionCheckoutResponse,
  SubscriptionContextQuery,
  SubscriptionContextResponse,
  SubscriptionIntervalResponse,
  SubscriptionNoticePath,
  SubscriptionNoticesResponse,
  SubscriptionOrganizationsResponse,
  SubscriptionPortalResponse,
  SubscriptionReadNoticeResponse,
  SubscriptionSelectionRequest,
  SubscriptionTrialResponse,
} from '../types/subscription-api.type'

export const listSubscriptionOrganizationsService = async (
  signal?: AbortSignal,
) => {
  const { api, validate } =
    httpDependencies<SubscriptionOrganizationsResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/api/auth/organization/list',
    signal,
  })
  const parsedResponse = subscriptionOrganizationsResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const getSubscriptionContextService = async (
  organizationId: string,
  signal?: AbortSignal,
  query?: SubscriptionContextQuery,
) => {
  const { api, validate } = httpDependencies<SubscriptionContextResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/me/context',
    signal,
    ...(query ? { params: subscriptionContextQuerySchema.parse(query) } : {}),
  })
  const parsedResponse = subscriptionContextSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }
  if (parsedResponse.data.organization.id !== organizationId) {
    throw new ConflictError(
      'A organização ativa mudou. Atualize a página antes de continuar.',
    )
  }

  return parsedResponse.data
}

export const selectSubscriptionOrganizationService = async (
  organizationId: string,
  establishmentId?: string,
) => {
  const body: SubscriptionSelectionRequest = subscriptionSelectionSchema.parse({
    organizationId,
    ...(establishmentId === undefined ? {} : { establishmentId }),
  })
  const { api, validate } = httpDependencies<SubscriptionContextResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/me/context',
    body,
  })
  const parsedResponse = subscriptionContextSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const getSubscriptionAccessService = async (
  organizationId: string,
  signal?: AbortSignal,
) => {
  const { api, validate } = httpDependencies<SubscriptionSnapshot>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/subscriptions',
    headers: subscriptionScopeHeadersSchema.parse({
      'x-organization-id': organizationId,
    }),
    signal,
  })
  const parsedResponse = subscriptionSchema.safeParse(validate.errors(response))

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const startSubscriptionTrialService = async (organizationId: string) => {
  const { api, validate } = httpDependencies<SubscriptionTrialResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/subscriptions/trial',
    headers: subscriptionScopeHeadersSchema.parse({
      'x-organization-id': organizationId,
    }),
  })
  const parsedResponse = subscriptionTrialResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const createSubscriptionCheckoutService = async (
  organizationId: string,
  interval: BillingIntervalType,
  requestId: string,
) => {
  const { api, validate } = httpDependencies<SubscriptionCheckoutResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/subscriptions/checkout',
    headers: subscriptionCommandHeadersSchema.parse({
      'x-organization-id': organizationId,
      'idempotency-key': requestId,
    }),
    body: subscriptionBillingRequestSchema.parse({
      billingInterval: interval,
    }),
  })
  const parsedResponse = subscriptionCheckoutResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const cancelSubscriptionService = async (
  organizationId: string,
  requestId: string,
) => {
  const { api, validate } = httpDependencies<SubscriptionCancellationResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/subscriptions/cancel',
    headers: subscriptionCommandHeadersSchema.parse({
      'x-organization-id': organizationId,
      'idempotency-key': requestId,
    }),
  })
  const parsedResponse = subscriptionCancellationResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const updateSubscriptionBillingIntervalService = async (
  organizationId: string,
  interval: BillingIntervalType,
  requestId: string,
) => {
  const { api, validate } = httpDependencies<SubscriptionIntervalResponse>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: '/admin/subscriptions/billing-interval',
    headers: subscriptionCommandHeadersSchema.parse({
      'x-organization-id': organizationId,
      'idempotency-key': requestId,
    }),
    body: subscriptionBillingRequestSchema.parse({
      billingInterval: interval,
    }),
  })
  const parsedResponse = subscriptionIntervalResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const createSubscriptionPortalService = async (
  organizationId: string,
  requestId: string,
) => {
  const { api, validate } = httpDependencies<SubscriptionPortalResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/subscriptions/portal',
    headers: subscriptionCommandHeadersSchema.parse({
      'x-organization-id': organizationId,
      'idempotency-key': requestId,
    }),
  })
  const parsedResponse = subscriptionPortalResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const listSubscriptionNoticesService = async (
  organizationId: string,
  signal?: AbortSignal,
) => {
  const { api, validate } = httpDependencies<SubscriptionNoticesResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/subscriptions/notices',
    headers: subscriptionScopeHeadersSchema.parse({
      'x-organization-id': organizationId,
    }),
    signal,
  })
  const parsedResponse = noticesSchema.safeParse(validate.errors(response))

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const markSubscriptionNoticeReadService = async (
  organizationId: string,
  deliveryId: string,
) => {
  const params: SubscriptionNoticePath = subscriptionNoticePathSchema.parse({
    deliveryId,
  })
  const { api, validate } = httpDependencies<SubscriptionReadNoticeResponse>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: `/admin/subscriptions/notices/${params.deliveryId}/read`,
    headers: subscriptionScopeHeadersSchema.parse({
      'x-organization-id': organizationId,
    }),
  })
  const parsedResponse = subscriptionReadNoticeResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}
