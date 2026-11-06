import { Box, Button, chakra, Icon, SimpleGrid } from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

const FormChangePassword = () => {
  return (
    <chakra.form>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <Field
          label="Nome"
          // invalid={!!errors.name}
          // errorText={errors.name?.message}
        >
          <InputField placeholder="Usuário" />
        </Field>

        <Box gridColumn={{ base: 'span 1', md: 'span 2' }} placeSelf="end">
          <Button
            type="submit"
            size="sm"
            rounded="lg"
            colorPalette="brand"
            // loading={isSubmitting}
          >
            <Icon as={SaveIcon} />
            Salvar
          </Button>
        </Box>
      </SimpleGrid>
    </chakra.form>
  )
}

export default FormChangePassword
