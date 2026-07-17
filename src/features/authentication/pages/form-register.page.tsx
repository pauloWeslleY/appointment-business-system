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
import { Link } from '@tanstack/react-router'
import { ArrowRightCircle } from 'lucide-react'

import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'

import { useRegisterPage } from '../hooks/use-register-page'

const FormRegister = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmitRegister } =
    useRegisterPage()

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
