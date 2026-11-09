import { queryOptions, skipToken } from '@tanstack/react-query'

import { getProfessionalPageService } from '../services/professional-page.service'
import type { ProfessionalPageApiRequest } from '../types/professional-page-api.type'
import { professionalsQueryKeys } from './professionals.query-key'

export function professionalPageQueryOptions(
  input: ProfessionalPageApiRequest,
  userId?: string,
  organizationId?: string | null,
) {
  return queryOptions({
    queryKey: [
      ...professionalsQueryKeys.all,
      'page',
      userId,
      organizationId,
      input,
    ],
    queryFn:
      userId && organizationId
        ? ({ signal }) => getProfessionalPageService(input, signal)
        : skipToken,
  })
}
