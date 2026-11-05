import { UploadFolder } from '@/shared/services/storage/upload.service'
import { uploadFiles } from '@/shared/services/storage/upload-files'

import type { ProfessionalDetailsApiResponse } from '../types/professional-api.type'
import type {
  CreateProfessionalFormRequest,
  UpdateProfessionalFormRequest,
} from '../types/professional-form.type'
import { toProfessionalProfile } from '../utils/professional-form-values'
import {
  createProfessionalService,
  updateEmploymentService,
  updateProfessionalService,
} from './professional.service'

export async function createProfessionalFromForm({
  values,
  establishmentId,
}: CreateProfessionalFormRequest): Promise<ProfessionalDetailsApiResponse> {
  const imageUrl = await uploadFiles(values.image, {
    id: establishmentId,
    folder: UploadFolder.COLLABORATORS,
  })

  return createProfessionalService({
    ...toProfessionalProfile(values, imageUrl),
    specialty: values.specialty,
    status: values.status,
    workSchedule: values.workSchedule.length ? values.workSchedule : null,
    establishmentIds: [establishmentId],
  })
}

export async function updateProfessionalFromForm({
  values,
  details,
  updateProfile,
  updateEmployment,
}: UpdateProfessionalFormRequest): Promise<ProfessionalDetailsApiResponse> {
  let profileSaved = false
  let professional = details.professional
  let employment = details.employment
  try {
    if (updateProfile) {
      const imageUrl = values.image
        ? await uploadFiles(values.image, {
            id: details.professional.id,
            folder: UploadFolder.COLLABORATORS,
          })
        : details.professional.imageUrl
      const profileResult = await updateProfessionalService(
        details.professional.id,
        toProfessionalProfile(values, imageUrl),
      )

      professional = profileResult.professional
      profileSaved = true
    }

    if (updateEmployment) {
      const employmentResult = await updateEmploymentService(
        details.employment.id,
        {
          specialty: values.specialty,
          status: values.status,
          workSchedule: values.workSchedule.length ? values.workSchedule : null,
          establishmentIds: details.employment.establishmentIds,
        },
      )

      employment = employmentResult.employment
    }
  } catch (error) {
    const hasPartialUpdate = profileSaved && updateEmployment
    if (hasPartialUpdate) {
      throw new Error(
        'O perfil foi salvo, mas não foi possível atualizar o vínculo. Recarregue e confira os dados antes de tentar novamente.',
        { cause: error },
      )
    }

    throw error
  }
  return { professional, employment }
}
