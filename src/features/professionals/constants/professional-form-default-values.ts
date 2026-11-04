import type { ProfessionalFormInput } from '../types/professional-form.type'

export const professionalFormDefaultValues: ProfessionalFormInput = {
  displayName: '',
  email: '',
  phone: '',
  document: '',
  bio: '',
  specialty: '',
  status: 'active',
  workSchedule: [],
  image: null,
}
