import { Alert, Box, Button, chakra, Flex, Icon, Text } from '@chakra-ui/react'
import { ArrowRight } from 'lucide-react'

import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import { inputStyles } from '@/theme/styles/global-styles'

import { useResetPasswordPage } from '../hooks/use-reset-password-page'

interface FormResetPasswordProps {
  token?: string
}

const FormResetPassword = ({ token }: FormResetPasswordProps) => {
  const {
    register,
    handleSubmit,
    onSubmitResetPassword,
    errors,
    isSubmitting,
  } = useResetPasswordPage(token)

  return (
    <chakra.form
      onSubmit={handleSubmit(onSubmitResetPassword)}
      h="full"
      w="full"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={{ base: '4', md: '8' }}
      autoComplete="off"
    >
      <Box>
        <Text
          as="h2"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="semibold"
          color={{ base: 'navy.800', _dark: 'sea.200' }}
        >
          Redefinir senha
        </Text>
        <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>
          Por favor, insira sua nova senha para redefinir sua conta.
        </Text>
      </Box>

      <Flex flexDir="column" gap="4">
        <Field
          label="Nova senha"
          invalid={!!errors.newPassword}
          errorText={errors.newPassword?.message}
        >
          <PasswordInput
            {...register('newPassword')}
            placeholder="Digite sua nova senha"
            size="sm"
            css={inputStyles}
          />
        </Field>

        <Button
          type="submit"
          w="full"
          rounded="lg"
          variant="surface"
          loading={isSubmitting}
          loadingText="Processando..."
          colorPalette="brand"
        >
          Enviar
          <Icon as={ArrowRight} boxSize="5" />
        </Button>
      </Flex>

      {errors.root && (
        <Alert.Root status="error" variant="subtle" rounded="lg">
          <Alert.Indicator />
          <Alert.Title>{errors.root?.message}</Alert.Title>
        </Alert.Root>
      )}
    </chakra.form>
  )
}

export default FormResetPassword
