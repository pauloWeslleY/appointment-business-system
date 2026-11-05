import type {
  ProfessionalDetailsApiResponse,
  UpdateProfessionalApiRequest,
} from '../types/professional-api.type'
import type {
  ProfessionalFormData,
  ProfessionalFormInput,
} from '../types/professional-form.type'

export function toProfessionalFormValues({
  professional,
  employment,
}: ProfessionalDetailsApiResponse): ProfessionalFormInput {
  return {
    displayName: professional.displayName,
    email: professional.email ?? '',
    phone: professional.phone ?? '',
    document: professional.document ?? '',
    bio: professional.bio ?? '',
    specialty: employment.specialty,
    status: employment.status,
    workSchedule: employment.workSchedule ?? [],
    image: null,
  }
}

export function toProfessionalProfile(
  values: ProfessionalFormData,
  imageUrl: string | null,
): UpdateProfessionalApiRequest {
  return {
    displayName: values.displayName,
    email: values.email || null,
    phone: values.phone || null,
    document: values.document || null,
    bio: values.bio || null,
    imageUrl,
  }
}
