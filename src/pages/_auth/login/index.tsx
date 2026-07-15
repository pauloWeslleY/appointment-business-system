import {
  Box,
  Button,
  chakra,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { SuccessContext } from 'better-auth/client'
import { ArrowRightCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/shared/auth'
import { mapErrorsLabel } from '@/shared/constants/map-errors-label'
import type { AuthModel } from '@/shared/types/authentication.model'

export const Route = createFileRoute('/_auth/login/')({
  component: LoginPage,
})

const LoginFormSchema = z.object({
  email: z.email('O e-mail é inválido').min(1, 'O e-mail é obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type LoginFormData = z.infer<typeof LoginFormSchema>

function LoginPage() {
  const navigate = Route.useNavigate()

  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmitLogin = async (data: LoginFormData) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: ({ data }: SuccessContext<AuthModel>) => {
          toaster.success({
            title: `Usuário ${data.user.name} logado com sucesso`,
          })

          reset()
          navigate({ to: '/establishment' })
        },
        onError: ({ error }) => {
          const _error = mapErrorsLabel[error.code] ?? error.message
          toaster.error({ title: _error || 'Erro ao realizar login' })
          setError('root', {
            type: 'custom',
            message: _error || 'Erro ao realizar login',
          })
        },
      },
    )
  }

  return (
    <chakra.form
      onSubmit={handleSubmit(onSubmitLogin)}
      h="full"
      w="full"
      p={{ base: '4', md: '8', xl: '40' }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={{ base: '4', md: '8', xl: '16' }}
    >
      <Box>
        <Text
          as="h2"
          fontSize={{ base: '2xl', md: '3xl' }}
          color={{
            base: 'colorPalette.500',
            _dark: 'colorPalette.300',
          }}
        >
          Bem-vindo de volta
        </Text>
        <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>
          Insira suas informações para continuar.
        </Text>
      </Box>

      <VStack gap={{ base: '4', md: '6' }}>
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

        <Stack align="flex-start" w="full">
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
            asChild
            variant="plain"
            size="sm"
            px="0"
            transition="colors"
            _hover={{ color: 'colorPalette.500' }}
          >
            <Link to="/">Esqueçeu sua senha?</Link>
          </Button>
        </Stack>

        <Button
          type="submit"
          size="sm"
          w="full"
          rounded="xl"
          loading={isSubmitting}
          loadingText="Entrando..."
        >
          <Icon as={ArrowRightCircle} boxSize="5" />
          Entrar
        </Button>

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
            _hover={{ color: 'colorPalette.500' }}
          >
            <Link to="/register">Cadastre-se agora</Link>
          </Button>
        </HStack>
      </VStack>
    </chakra.form>
  )
}
