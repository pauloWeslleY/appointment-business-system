import {
  Box,
  Button,
  chakra,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightCircle } from 'lucide-react'

import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'

export const Route = createFileRoute('/_auth/register/')({
  component: RegisterPage,
})

function RegisterPage() {
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
          Junte-se a nós!
        </Text>
        <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>
          Insira suas informações para criar sua conta.
        </Text>
      </Box>

      <VStack gap={{ base: '4', md: '6' }}>
        <Field label="Usuário">
          <Input placeholder="Digite seu usuário" rounded="xl" size="sm" />
        </Field>

        <Field label="E-mail">
          <Input placeholder="Digite seu email" rounded="xl" size="sm" />
        </Field>

        <Field label="Senha">
          <PasswordInput
            placeholder="Digite sua senha"
            rounded="xl"
            size="sm"
          />
        </Field>

        <Button type="submit" size="sm" w="full" rounded="xl">
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
      </VStack>
    </chakra.form>
  )
}
