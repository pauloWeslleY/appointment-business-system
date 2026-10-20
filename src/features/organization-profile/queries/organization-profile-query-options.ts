import { queryOptions } from '@tanstack/react-query'

import { getOrganizationProfileService } from '../services/organizaton-profile.service'
import { organizationProfileQueryKeys } from './organization-profile-query-key'

export const organizationProfileSummaryQueryOptions = () => {
  return queryOptions({
    queryKey: organizationProfileQueryKeys.summary(),
    queryFn: getOrganizationProfileService,
  })
}
