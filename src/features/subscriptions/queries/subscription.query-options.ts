import { queryOptions, skipToken } from '@tanstack/react-query'

import {
  getSubscriptionAccessService,
  getSubscriptionContextService,
  listSubscriptionNoticesService,
  listSubscriptionOrganizationsService,
} from '../services/subscription.service'
import { subscriptionQueryKey } from './subscription.query-key'

export const subscriptionOrganizationsQueryOptions = (userId?: string) =>
  queryOptions({
    queryKey: subscriptionQueryKey.organizations(userId),
    queryFn: userId
      ? ({ signal }) => listSubscriptionOrganizationsService(signal)
      : skipToken,
  })

export const subscriptionContextQueryOptions = (
  userId?: string,
  organizationId?: string,
) =>
  queryOptions({
    queryKey: subscriptionQueryKey.context(userId, organizationId),
    queryFn:
      userId && organizationId
        ? ({ signal }) => getSubscriptionContextService(organizationId, signal)
        : skipToken,
    retry: false,
  })

export const subscriptionAccessQueryOptions = (
  userId: string,
  organizationId: string,
) =>
  queryOptions({
    queryKey: subscriptionQueryKey.access(userId, organizationId),
    queryFn: ({ signal }) =>
      getSubscriptionAccessService(organizationId, signal),
    retry: false,
    refetchOnWindowFocus: true,
  })

export const subscriptionNoticesQueryOptions = (
  userId: string,
  organizationId: string,
) =>
  queryOptions({
    queryKey: subscriptionQueryKey.notices(userId, organizationId),
    queryFn: ({ signal }) =>
      listSubscriptionNoticesService(organizationId, signal),
    retry: false,
  })
