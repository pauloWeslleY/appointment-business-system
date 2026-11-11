import { Button, chakra, Stack } from '@chakra-ui/react'

import { useFormCreateProfessional } from '../hooks/use-form-create-professional'
import ProfessionalFormFields from './professional-form-fields'

interface CreateProfessionalFormProps {
  establishmentId: string
  onSaved: () => void
}

const CreateProfessionalForm = ({
  establishmentId,
  onSaved,
}: CreateProfessionalFormProps) => {
  const { form, handleCreateProfessional, isCreatingProfessional } =
    useFormCreateProfessional(establishmentId, onSaved)

  return (
    <chakra.form onSubmit={handleCreateProfessional}>
      <Stack gap="4">
        <chakra.fieldset disabled={isCreatingProfessional} border="0" minW="0">
          <ProfessionalFormFields form={form} />
        </chakra.fieldset>

        <Button
          type="submit"
          size="sm"
          rounded="lg"
          w="fit"
          alignSelf="flex-end"
          colorPalette="brand"
          loading={isCreatingProfessional}
        >
          Cadastrar profissional
        </Button>
      </Stack>
    </chakra.form>
  )
}

export default CreateProfessionalForm
