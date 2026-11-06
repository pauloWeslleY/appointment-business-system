import { useRouteContext } from '@tanstack/react-router'

import type { GetMeContextResponse } from '../types/member-response.type'

export function useMemberContext(): GetMeContextResponse | undefined {
  return useRouteContext({
    strict: false,
    select: (context) => context.memberContext,
  })
}
