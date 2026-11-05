import { Button, chakra, Stack } from '@chakra-ui/react'

import { useFormCreateProfessional } from '../hooks/use-form-create-professional'
import ProfessionalFormFields from './professional-form-fields'

const CreateProfessionalForm = ({
  establishmentId,
  onSaved,
}: {
  establishmentId: string
  onSaved: () => void
}) => {
  const { form, handleCreateProfessional, isCreatingProfessional } =
    useFormCreateProfessional(establishmentId, onSaved)
  const isSubmitting = isCreatingProfessional || form.formState.isSubmitting

  return (
    <chakra.form onSubmit={handleCreateProfessional}>
      <Stack gap="4">
        <chakra.fieldset disabled={isSubmitting} border="0" minW="0">
          <ProfessionalFormFields form={form} />
        </chakra.fieldset>
        <Button
          type="submit"
          size="sm"
          rounded="lg"
          w="fit"
          alignSelf="flex-end"
          colorPalette="brand"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Cadastrar profissional
        </Button>
      </Stack>
    </chakra.form>
  )
}

export default CreateProfessionalForm
