import { queryOptions, skipToken } from '@tanstack/react-query'

import { getProfessionalPageService } from '../services/professional-page.service'
import type { ProfessionalPageApiRequest } from '../types/professional-page-api.type'
import { professionalsQueryKeys } from './professionals.query-key'

export function professionalPageQueryOptions(
  professionalPageRequest: ProfessionalPageApiRequest,
  userId?: string,
  organizationId?: string | null,
) {
  return queryOptions({
    queryKey: professionalsQueryKeys.page(
      professionalPageRequest,
      userId,
      organizationId,
    ),
    queryFn:
      userId && organizationId
        ? ({ signal }) =>
            getProfessionalPageService(professionalPageRequest, signal)
        : skipToken,
  })
}
