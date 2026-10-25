import { redirect } from '@tanstack/react-router'

import { validateEnsureOrganizationExists } from '@/features/authentication/validations/validate-organization-exists'
import { getOrganizationProfileService } from '@/features/organization-profile/services/organizaton-profile.service'

import { getEstablishmentsByOrganizationProfileIdService } from '../services/establishment.service'

export const validationEstablishmentExistsRouteHome = async () => {
  await validateEnsureOrganizationExists()
  const organizationProfile = await getOrganizationProfileService()
  const establishments = await getEstablishmentsByOrganizationProfileIdService(
    organizationProfile.id,
  )

  if (establishments.length === 0) {
    throw redirect({ to: '/establishment/new', replace: true })
  }
}
