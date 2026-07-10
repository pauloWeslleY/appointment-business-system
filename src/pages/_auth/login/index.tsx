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
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightCircle } from 'lucide-react'

import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'

export const Route = createFileRoute('/_auth/login/')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <chakra.form
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
        <Field label="E-mail">
          <Input placeholder="Digite seu email" rounded="xl" size="sm" />
        </Field>

        <Stack align="flex-start" w="full">
          <Field label="Senha">
            <PasswordInput
              placeholder="Digite sua senha"
              rounded="xl"
              size="sm"
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

        <Button type="submit" size="sm" w="full" rounded="xl">
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
