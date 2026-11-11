import { UploadFolder } from '@/shared/services/storage/upload.service'
import { uploadFiles } from '@/shared/services/storage/upload-files'

import type { ProfessionalDetailsApiResponse } from '../types/professional-api.type'
import type {
  CreateProfessionalFormRequest,
  ProfessionalFormData,
  UpdateProfessionalFormRequest,
} from '../types/professional-form.type'
import {
  toProfessionalEmploymentRequest,
  toProfessionalProfileRequest,
} from '../utils/professional-form-values'
import {
  createProfessionalService,
  updateEmploymentService,
  updateProfessionalService,
} from './professional.service'

export async function createProfessionalFromForm({
  values: professionalFormValues,
  establishmentId,
}: CreateProfessionalFormRequest): Promise<ProfessionalDetailsApiResponse> {
  const imageUrl = await uploadFiles(professionalFormValues.image, {
    id: establishmentId,
    folder: UploadFolder.COLLABORATORS,
  })

  return createProfessionalService({
    ...toProfessionalProfileRequest(professionalFormValues, imageUrl),
    ...toProfessionalEmploymentRequest(professionalFormValues, [
      establishmentId,
    ]),
  })
}

export async function updateProfessionalFromForm({
  values: professionalFormValues,
  details: professionalDetails,
  updateProfile,
  updateEmployment,
}: UpdateProfessionalFormRequest): Promise<ProfessionalDetailsApiResponse> {
  let professional = professionalDetails.professional

  if (updateProfile) {
    professional = await saveProfessionalProfile(
      professionalFormValues,
      professionalDetails.professional,
    )
  }

  if (!updateEmployment) {
    return { professional, employment: professionalDetails.employment }
  }

  try {
    const employmentUpdateResponse = await updateEmploymentService(
      professionalDetails.employment.id,
      toProfessionalEmploymentRequest(
        professionalFormValues,
        professionalDetails.employment.establishmentIds,
      ),
    )

    return { professional, employment: employmentUpdateResponse.employment }
  } catch (error) {
    if (!updateProfile) {
      throw error
    }

    throw new Error(
      'O perfil foi salvo, mas não foi possível atualizar o vínculo. Recarregue e confira os dados antes de tentar novamente.',
      { cause: error },
    )
  }
}

async function saveProfessionalProfile(
  professionalFormValues: ProfessionalFormData,
  professional: ProfessionalDetailsApiResponse['professional'],
): Promise<ProfessionalDetailsApiResponse['professional']> {
  const imageUrl = await resolveProfessionalImage(
    professionalFormValues.image,
    professional,
  )
  const profileUpdateResponse = await updateProfessionalService(
    professional.id,
    toProfessionalProfileRequest(professionalFormValues, imageUrl),
  )

  return profileUpdateResponse.professional
}

async function resolveProfessionalImage(
  image: ProfessionalFormData['image'],
  professional: ProfessionalDetailsApiResponse['professional'],
): Promise<string | null> {
  if (!image) {
    return professional.imageUrl
  }

  const imageKey = await uploadFiles(image, {
    id: professional.id,
    folder: UploadFolder.COLLABORATORS,
  })

  return imageKey ?? professional.imageUrl
}
