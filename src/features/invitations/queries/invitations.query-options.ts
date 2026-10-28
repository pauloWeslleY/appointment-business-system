import { queryOptions, skipToken } from '@tanstack/react-query'

import { getEstablishmentsByOrganizationProfileIdService } from '@/features/establishment/services/establishment.service'
import { getOrganizationProfileService } from '@/features/organization-profile/services/organizaton-profile.service'

import {
  getInvitationPreviewService,
  getInvitationService,
  listInvitationsService,
} from '../services/invitations.service'
import { invitationQueryKey } from './invitations.query-key'

export const invitationOrganizationProfileQueryOptions = (
  userId?: string,
  organizationId?: string,
) => {
  return queryOptions({
    queryKey: invitationQueryKey.organizationProfile(userId, organizationId),
    queryFn:
      userId && organizationId ? getOrganizationProfileService : skipToken,
  })
}

export const invitationEstablishmentsQueryOptions = (
  userId?: string,
  organizationId?: string,
  profileId?: string,
) => {
  return queryOptions({
    queryKey: invitationQueryKey.establishments(
      userId,
      organizationId,
      profileId,
    ),
    queryFn:
      userId && organizationId && profileId
        ? () => getEstablishmentsByOrganizationProfileIdService(profileId)
        : skipToken,
  })
}

export const getInvitationQueryOptions = (
  invitationId?: string,
  userId?: string,
) => {
  return queryOptions({
    queryKey: invitationQueryKey.detail(invitationId, userId),
    queryFn:
      invitationId && userId
        ? ({ signal }) => getInvitationService(invitationId, signal)
        : skipToken,
  })
}

export const getInvitationPreviewQueryOptions = (invitationId?: string) => {
  return queryOptions({
    queryKey: invitationQueryKey.preview(invitationId),
    queryFn: invitationId
      ? () => getInvitationPreviewService(invitationId)
      : skipToken,
  })
}

export const listInvitationsQueryOptions = (
  userId?: string,
  organizationId?: string,
) => {
  return queryOptions({
    queryKey: invitationQueryKey.list(userId, organizationId),
    queryFn:
      userId && organizationId
        ? ({ signal }) => listInvitationsService(signal)
        : skipToken,
  })
}
