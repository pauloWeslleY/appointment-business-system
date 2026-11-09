import { mutationOptions } from '@tanstack/react-query'

import { startBusinessOnboardingService } from '../services/panel-access.service'
import { authenticatedContextQueryPrefix } from './authentication.query-key'

export const startBusinessOnboardingMutationOptions = () =>
  mutationOptions({
    mutationKey: ['start-business-onboarding'],
    mutationFn: startBusinessOnboardingService,

    onSuccess: (_data, _variables, _result, { client }) =>
      client.invalidateQueries({
        queryKey: authenticatedContextQueryPrefix(),
      }),
  })
