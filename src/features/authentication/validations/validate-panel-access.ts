import { redirect } from '@tanstack/react-router'

import { getPanelAccessService } from '../services/panel-access.service'

export async function validatePanelAccess() {
  const access = await getPanelAccessService()

  if (!access.canAccessAdmin && !access.canStartBusinessOnboarding) {
    throw redirect({ to: '/business-access-required', replace: true })
  }

  return access
}
