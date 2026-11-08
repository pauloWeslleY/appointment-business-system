import { queryOptions } from '@tanstack/react-query'

import { getPanelAccessService } from '../services/panel-access.service'
import { authenticationQueryKey } from './authentication.query-key'

export const panelAccessQueryOptions = (
  userId: string,
  organizationId?: string | null,
) =>
  queryOptions({
    queryKey: authenticationQueryKey.panelAccessByContext(
      userId,
      organizationId,
    ),
    queryFn: getPanelAccessService,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: false,
  })
