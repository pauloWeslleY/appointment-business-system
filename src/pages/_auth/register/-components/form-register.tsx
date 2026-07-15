import {
  Alert,
  Box,
  Button,
  chakra,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import type { SuccessContext } from 'better-auth/client'
import { ArrowRightCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/shared/auth'
import { mapErrorsLabel } from '@/shared/constants/map-errors-label'
import { useFormStepRegister } from '@/shared/store/form-step-register'
import type { AuthModel } from '@/shared/types/authentication.model'

const RegisterFormSchema = z.object({
  username: z.string().min(1, 'O usuário é obrigatório'),
  email: z.email('O e-mail é inválido').min(1, 'O e-mail é obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type RegisterFormData = z.infer<typeof RegisterFormSchema>

const FormRegister = () => {
  const { step, setStep } = useFormStepRegister()

  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmitRegister = async (data: RegisterFormData) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.username,
      },
      {
        onSuccess: ({ data }: SuccessContext<AuthModel>) => {
          toaster.success({
            title: `Usuário ${data.user.name} cadastrado com sucesso`,
          })

          reset()
          setStep(step + 1)
        },
        onError: ({ error }) => {
          const _error = mapErrorsLabel[error.code] ?? error.message
          toaster.error({ title: _error || 'Erro ao realizar cadastro' })
          setError('root', {
            type: 'custom',
            message: _error || 'Erro ao realizar cadastro',
          })
        },
      },
    )
  }

  return (
    <chakra.form
      onSubmit={handleSubmit(onSubmitRegister)}
      h="full"
      w="full"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={{ base: '4', md: '8', xl: '16' }}
    >
      <Box>
        <Text
          as="h2"
          fontSize={{ base: '2xl', md: '3xl' }}
          color={{ base: 'colorPalette.500', _dark: 'colorPalette.300' }}
        >
          Junte-se a nós!
        </Text>
        <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>
          Insira suas informações para criar sua conta.
        </Text>
      </Box>

      <VStack gap={{ base: '4', md: '6' }}>
        <Field
          label="Usuário"
          invalid={!!errors.username}
          errorText={errors.username?.message}
        >
          <Input
            {...register('username')}
            placeholder="Digite seu usuário"
            rounded="xl"
            size="sm"
            borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
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
            rounded="xl"
            size="sm"
            borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
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
            rounded="xl"
            size="sm"
            borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
          />
        </Field>

        <Button
          type="submit"
          size="sm"
          w="full"
          rounded="xl"
          loading={isSubmitting}
          loadingText="Criando conta..."
        >
          <Icon as={ArrowRightCircle} boxSize="5" />
          Criar conta
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
            _hover={{ color: 'colorPalette.500' }}
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
