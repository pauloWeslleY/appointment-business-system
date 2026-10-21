import { mutationOptions } from '@tanstack/react-query'

import { createMeContextService } from '../services/member-context.service'

export const meContextMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-me-context'],
      mutationFn: createMeContextService,
    })
  },
}
