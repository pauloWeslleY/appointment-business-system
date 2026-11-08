import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { startBusinessOnboardingService } from '../services/panel-access.service'

export function useStartBusinessOnboarding() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: startBusinessOnboardingService,
    onSuccess: () => navigate({ to: '/organization-profile', replace: true }),
  })
}
