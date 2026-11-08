import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { startBusinessOnboardingMutationOptions } from '../queries/panel-access.mutation-options'

export function useStartBusinessOnboarding() {
  const navigate = useNavigate()
  const options = startBusinessOnboardingMutationOptions()
  return useMutation({
    ...options,
    onSuccess: async (data, variables, result, context) => {
      await options.onSuccess?.(data, variables, result, context)
      await navigate({ to: '/organization-profile', replace: true })
    },
  })
}
