import {
  Alert,
  Box,
  Button,
  chakra,
  Flex,
  Icon,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Field } from '@/components/ui/field'
import { inputStyles } from '@/theme/styles/global-styles'

import { useForgotPasswordPage } from '../hooks/use-forgot-password-page'

const FormForgotPassword = () => {
  const {
    register,
    handleSubmit,
    onSubmitForgotPassword,
    errors,
    isSubmitting,
  } = useForgotPasswordPage()

  return (
    <chakra.form
      onSubmit={handleSubmit(onSubmitForgotPassword)}
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
          color={{ _light: 'navy.800', _dark: 'sea.200' }}
        >
          Esqueceu sua senha?
        </Text>
        <Text color={{ _light: 'gray.500', _dark: 'gray.400' }}>
          Por favor, insira seu e-mail para redefinir sua conta.
        </Text>
      </Box>

      <Flex flexDir="column" gap="4">
        <Field
          label="E-mail"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          <Input
            {...register('email')}
            placeholder="Digite seu email"
            size="sm"
            css={inputStyles}
          />
        </Field>

        <Stack gap="1">
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

          <Button
            asChild
            type="button"
            w="full"
            size="sm"
            variant="plain"
            colorPalette="primary"
            transition="colors"
            _hover={{ color: { _light: 'sea.800', _dark: 'sea.400' } }}
          >
            <Link to="/login">Voltar para o login</Link>
          </Button>
        </Stack>
      </Flex>

      <Alert.Root status="info" variant="subtle" rounded="lg">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>
            Enviaremos um e-mail para redefinir sua senha.
          </Alert.Title>
          <Alert.Description>
            Se houver um e-mail associado à sua conta, você receberá um e-mail
            para redefinir sua senha.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      {errors.root && (
        <Alert.Root status="error" variant="subtle" rounded="lg">
          <Alert.Indicator />
          <Alert.Title>{errors.root?.message}</Alert.Title>
        </Alert.Root>
      )}
    </chakra.form>
  )
}

export default FormForgotPassword
