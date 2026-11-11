import { Button, chakra, HStack, Icon, Stack } from '@chakra-ui/react'
import { Save } from 'lucide-react'

import { useFormUpdateProfessional } from '../hooks/use-form-update-professional'
import type { ProfessionalDetailsApiResponse } from '../types/professional-api.type'
import ProfessionalFormFields from './professional-form-fields'

interface UpdateProfessionalFormProps {
  details: ProfessionalDetailsApiResponse
  onSaved: () => void
  onCancel: () => void
}

const UpdateProfessionalForm = ({
  details,
  onSaved,
  onCancel,
}: UpdateProfessionalFormProps) => {
  const { form, handleUpdateProfessional, isUpdatingProfessional } =
    useFormUpdateProfessional(details, onSaved)

  return (
    <chakra.form onSubmit={handleUpdateProfessional}>
      <Stack gap="4">
        <chakra.fieldset disabled={isUpdatingProfessional} border="0" minW="0">
          <ProfessionalFormFields
            form={form}
            imageUrl={details.professional.imageUrl}
          />
        </chakra.fieldset>

        <HStack justify="end" flexWrap="wrap" gap="2">
          <Button
            type="button"
            size="sm"
            rounded="lg"
            colorPalette="red"
            variant="ghost"
            disabled={isUpdatingProfessional}
            onClick={onCancel}
          >
            Fechar
          </Button>

          <Button
            type="submit"
            size="sm"
            rounded="lg"
            colorPalette="brand"
            loading={isUpdatingProfessional}
          >
            <Icon as={Save} boxSize="5" />
            Salvar profissional
          </Button>
        </HStack>
      </Stack>
    </chakra.form>
  )
}

export default UpdateProfessionalForm
