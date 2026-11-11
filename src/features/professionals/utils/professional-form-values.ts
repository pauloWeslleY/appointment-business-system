import type {
  EmploymentApiRequest,
  ProfessionalDetailsApiResponse,
  UpdateProfessionalApiRequest,
} from '../types/professional-api.type'
import type {
  ProfessionalFormData,
  ProfessionalFormDirtyFields,
  ProfessionalFormInput,
} from '../types/professional-form.type'

export const toProfessionalFormValues = ({
  professional,
  employment,
}: ProfessionalDetailsApiResponse): ProfessionalFormInput => ({
  displayName: professional.displayName,
  email: professional.email ?? '',
  phone: professional.phone ?? '',
  document: professional.document ?? '',
  bio: professional.bio ?? '',
  specialty: employment.specialty,
  status: employment.status,
  workSchedule: employment.workSchedule ?? [],
  image: null,
})

export const toProfessionalProfileRequest = (
  professionalFormValues: ProfessionalFormData,
  imageUrl: string | null,
): UpdateProfessionalApiRequest => ({
  displayName: professionalFormValues.displayName,
  email: professionalFormValues.email || null,
  phone: professionalFormValues.phone || null,
  document: professionalFormValues.document || null,
  bio: professionalFormValues.bio || null,
  imageUrl,
})

export function toProfessionalEmploymentRequest(
  professionalFormValues: ProfessionalFormData,
  establishmentIds: string[],
): EmploymentApiRequest {
  const hasWorkSchedule = professionalFormValues.workSchedule.length > 0

  return {
    specialty: professionalFormValues.specialty,
    status: professionalFormValues.status,
    workSchedule: hasWorkSchedule ? professionalFormValues.workSchedule : null,
    establishmentIds,
  }
}

export function getProfessionalFormChanges(
  dirtyFields: ProfessionalFormDirtyFields,
) {
  const updateProfile = Boolean(
    dirtyFields.displayName ||
    dirtyFields.email ||
    dirtyFields.phone ||
    dirtyFields.document ||
    dirtyFields.bio ||
    dirtyFields.image,
  )
  const updateEmployment = Boolean(
    dirtyFields.specialty || dirtyFields.status || dirtyFields.workSchedule,
  )

  return {
    updateProfile,
    updateEmployment,
  }
}
