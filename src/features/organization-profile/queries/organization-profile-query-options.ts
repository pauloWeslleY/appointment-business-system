import { queryOptions } from '@tanstack/react-query'

import { getFullOrganization } from '../services/organization.service'
import { getOrganizationProfileService } from '../services/organizaton-profile.service'
import {
  organizationProfileQueryKeys,
  organizationQueryKeys,
} from './organization-profile-query-key'

export const organizationProfileSummaryQueryOptions = () => {
  return queryOptions({
    queryKey: organizationProfileQueryKeys.summary(),
    queryFn: getOrganizationProfileService,
  })
}

export const organizationDetailQueryOptions = (organizationId?: string) => {
  return queryOptions({
    queryKey: organizationQueryKeys.detail(organizationId),
    queryFn: async () => {
      if (!organizationId) {
        throw new Error('Organization ID is required')
      }

      const { data, error } = await getFullOrganization(organizationId)

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
    enabled: !!organizationId,
  })
}
