import {
  Alert,
  Box,
  Button,
  chakra,
  HStack,
  Icon,
  Image,
  Input,
  Separator,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Link, useLocation } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'

import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import { inputStyles } from '@/theme/styles/global-styles'

import { useLoginPage } from '../hooks/use-login-page'

const FormLoginPage = () => {
  const {
    errors,
    isSubmitting,
    isPendingLoginWithGoogle,
    register,
    handleSubmit,
    onSubmitLogin,
    handleSignInWithGoogle,
  } = useLoginPage()
  const location = useLocation()

  return (
    <chakra.form
      onSubmit={handleSubmit(onSubmitLogin)}
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
          Bem-vindo de volta
        </Text>
        <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>
          Insira suas informações para continuar.
        </Text>
      </Box>

      <VStack gap={{ base: '4' }}>
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

        <Stack align="flex-start" w="full" gap="0">
          <Field
            label="Senha"
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <PasswordInput
              {...register('password')}
              placeholder="Digite sua senha"
              size="sm"
              css={inputStyles}
            />
          </Field>

          <Button
            asChild
            variant="plain"
            size="sm"
            px="0"
            transition="colors"
            _hover={{ color: 'colorPalette.500' }}
          >
            <Link to="/forgot-password">Esqueçeu sua senha?</Link>
          </Button>
        </Stack>

        <Button
          type="submit"
          w="full"
          rounded="lg"
          variant="surface"
          loading={isSubmitting}
          loadingText="Processando..."
          colorPalette="brand"
        >
          Entrar
          <Icon as={LogIn} boxSize="5" />
        </Button>

        <Stack w="full" gap={{ base: '4' }}>
          <HStack w="full">
            <Separator
              flex="1"
              borderColor={{ base: 'slate.300', _dark: 'slate.600' }}
            />
            <Text flexShrink="0">Ou continue</Text>
            <Separator
              flex="1"
              borderColor={{ base: 'slate.300', _dark: 'slate.600' }}
            />
          </HStack>

          <Button
            type="button"
            onClick={handleSignInWithGoogle}
            w="full"
            rounded="lg"
            variant="solid"
            loading={isPendingLoginWithGoogle}
            loadingText="Processando..."
            colorPalette="gray"
          >
            <Image src="/google.png" alt="Google" boxSize="4" />
            Continuar com Google
          </Button>
        </Stack>

        <HStack
          align="baseline"
          justify="flex-start"
          alignSelf="flex-start"
          gap="1"
          fontSize="sm"
        >
          <Text>Ainda não tem uma conta?</Text>
          <Button
            asChild
            variant="plain"
            size="sm"
            px="0"
            transition="colors"
            color={{ base: 'sea.600', _dark: 'sea.400' }}
            _hover={{ color: { base: 'sea.900', _dark: 'sea.700' } }}
          >
            <Link to="/register" params={{ step: '0' }}>
              Cadastre-se agora
            </Link>
          </Button>
        </HStack>
      </VStack>

      {location.state.passwordResetRequestSuccess && (
        <Alert.Root status="info" rounded="lg">
          <Alert.Indicator />

          <Alert.Content>
            <Alert.Title>Verifique seu e-mail</Alert.Title>
            <Alert.Description>
              Enviamos um link para redefinir sua senha.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {location.state.registrationSuccess && (
        <Alert.Root status="info" rounded="lg">
          <Alert.Indicator />

          <Alert.Content>
            <Alert.Title>Verifique seu e-mail</Alert.Title>
            <Alert.Description>
              Enviamos um link de confirmação para seu e-mail. Acesse sua caixa
              de entrada e confirme seu endereço para ativar sua conta.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
    </chakra.form>
  )
}

export default FormLoginPage
