import { useStorageImage } from '@/shared/hooks/use-get-storage-image'

import { mapStatusEstablishment } from '../types/establishment-status.type'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'
import { getEstablishmentStorageImageKey } from '../utils/establishment-storage-image'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

export function useEstablishmentTableRow(
  establishment: EstablishmentOrganizationProfileApiResponse,
) {
  const { data: establishmentStorageImageUrl } = useStorageImage(
    getEstablishmentStorageImageKey(establishment.imageUrl),
  )

  const establishmentStatus = mapStatusEstablishment(establishment.status)
  const { establishmentOpen: isEstablishmentOpen, openingHours } =
    validateOpeningHoursEstablishment(establishment)

  const establishmentImageUrl =
    establishmentStorageImageUrl ?? establishment.imageUrl
  const establishmentFirstPhone = establishment.phones[0]
  const establishmentRatingPercentage = (establishment.averageRating / 5) * 100

  return {
    establishmentImageUrl,
    establishmentStatus,
    isEstablishmentOpen,
    openingHours,
    establishmentFirstPhone,
    establishmentRatingPercentage,
  }
}
