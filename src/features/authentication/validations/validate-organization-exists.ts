import { redirect } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'

export const validateEnsureOrganizationExists = async () => {
  const { data: organization } = await authClient.organization.list()

  if (!organization || organization.length === 0) {
    throw redirect({ to: '/organization-profile', replace: true })
  }

  return {
    organization,
  }
}
