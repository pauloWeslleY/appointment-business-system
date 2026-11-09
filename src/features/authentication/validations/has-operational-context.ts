import type { GetMeContextResponse } from '@/features/members/types/member-response.type'
import { StatusOrganizationProfile } from '@/features/organization-profile/types/status-organization-profile.type'

import type { AuthenticatedContextApiResponse } from '../types/authenticated-context.type'

export function hasOperationalContext(
  context: AuthenticatedContextApiResponse,
): context is AuthenticatedContextApiResponse & GetMeContextResponse {
  const organizationId = context.organization?.id

  const selectedOrganization = context.organizations.find(
    (organization) => organization.id === organizationId,
  )

  const hasOrganization = context.organization !== null
  const hasContextMember = context.member !== null
  const hasContextRole = context.role !== null
  const hasContextScope = context.scope !== null

  const hasOrganizationActive =
    selectedOrganization?.organizationStatus ===
    StatusOrganizationProfile.ACTIVE

  return (
    context.canAccessAdmin &&
    hasOrganization &&
    hasContextMember &&
    hasContextRole &&
    hasContextScope &&
    hasOrganizationActive
  )
}
