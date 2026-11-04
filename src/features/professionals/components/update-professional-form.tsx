import { Button, chakra, Stack } from '@chakra-ui/react'

import { useFormUpdateProfessional } from '../hooks/use-form-update-professional'
import type { ProfessionalDetailsApiResponse } from '../types/professional-api.type'
import ProfessionalFormFields from './professional-form-fields'
const UpdateProfessionalForm = ({
  details,
  onSaved,
}: {
  details: ProfessionalDetailsApiResponse
  onSaved: () => void
}) => {
  const { form, handleUpdateProfessional, isUpdatingProfessional } =
    useFormUpdateProfessional(details, onSaved)
  const isSubmitting = isUpdatingProfessional || form.formState.isSubmitting
  return (
    <chakra.form onSubmit={handleUpdateProfessional}>
      <Stack gap="4">
        <chakra.fieldset disabled={isSubmitting} border="0" minW="0">
          <ProfessionalFormFields
            form={form}
            imageUrl={details.professional.imageUrl}
          />
        </chakra.fieldset>
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Salvar profissional
        </Button>
      </Stack>
    </chakra.form>
  )
}
export default UpdateProfessionalForm
