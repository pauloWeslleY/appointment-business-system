import {
  Alert,
  Button,
  chakra,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'

import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import { inputStyles } from '@/theme/styles/global-styles'

import { useRegisterPage } from '../hooks/use-register-page'

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    onSubmitRegister,
    errors,
    isSubmitting,
    hasRedirectTo,
  } = useRegisterPage()

  return (
    <chakra.form
      onSubmit={handleSubmit(onSubmitRegister)}
      h="full"
      w="full"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={{ base: '4', md: '8' }}
      autoComplete="off"
    >
      <div>
        <Text
          as="h2"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="semibold"
          color={{ base: 'navy.800', _dark: 'sea.200' }}
        >
          Crie sua conta
        </Text>
        <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>
          Insira suas informações para criar sua conta.
        </Text>
      </div>

      {hasRedirectTo && (
        <Alert.Root status="info" variant="surface" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>Utilize o e-mail que recebeu o convite</Alert.Title>
        </Alert.Root>
      )}

      <VStack gap={{ base: '4' }}>
        <Field
          label="Usuário"
          invalid={!!errors.username}
          errorText={errors.username?.message}
        >
          <Input
            {...register('username')}
            placeholder="Digite seu usuário"
            size="sm"
            css={inputStyles}
          />
        </Field>

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
          type="submit"
          w="full"
          rounded="lg"
          variant="surface"
          loading={isSubmitting}
          loadingText="Processando..."
          colorPalette="brand"
        >
          Criar conta
          <Icon as={LogIn} boxSize="5" />
        </Button>

        <HStack
          align="baseline"
          justify="flex-start"
          alignSelf="flex-start"
          gap="1"
          fontSize="sm"
        >
          <Text>Já tem uma conta?</Text>
          <Button
            asChild
            variant="plain"
            size="sm"
            px="0"
            transition="colors"
            color={{ base: 'sea.600', _dark: 'sea.400' }}
            _hover={{ color: { base: 'sea.900', _dark: 'sea.700' } }}
          >
            <Link to="/login">Faça login</Link>
          </Button>
        </HStack>

        {errors.root?.message && (
          <Alert.Root status="error" variant="subtle" rounded="xl">
            <Alert.Indicator />
            <Alert.Title>{errors.root.message}</Alert.Title>
          </Alert.Root>
        )}
      </VStack>
    </chakra.form>
  )
}

export default FormRegister
