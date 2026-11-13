import { Alert, Button, chakra, HStack, Icon } from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

import { useUpdateProfile } from '../hooks/use-update-profile'

const FormProfileUser = () => {
  const {
    errors,
    register,
    isSubmitting,
    onSubmitUpdateProfile,
    handleSubmit,
    handleClearErrorUpdateProfile,
  } = useUpdateProfile()

  return (
    <chakra.form
      onSubmit={handleSubmit(onSubmitUpdateProfile)}
      display="flex"
      flexDir="column"
      gap="4"
    >
      <HStack>
        <Field
          label="Nome"
          invalid={!!errors.name}
          errorText={errors.name?.message}
        >
          <InputField placeholder="Usuário" {...register('name')} />
        </Field>

        <Button
          alignSelf="flex-end"
          type="submit"
          size="sm"
          rounded="lg"
          colorPalette="brand"
          loading={isSubmitting}
        >
          <Icon as={SaveIcon} />
          Salvar
        </Button>
      </HStack>

      {errors.name && (
        <Alert.Root status="error" variant="subtle" rounded="lg">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{errors.name.message}</Alert.Title>
          </Alert.Content>

          <Button size="2xs" onClick={handleClearErrorUpdateProfile}>
            Fechar
          </Button>
        </Alert.Root>
      )}
    </chakra.form>
  )
}

export default FormProfileUser
