import { Alert, Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, MailCheck, ShieldCheck } from 'lucide-react'
import { useTransition } from 'react'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'

const VerifyEmail = ({ search }: { search: { token: string } }) => {
  const [isPendingVerificationEmail, startTransition] = useTransition()
  const navigate = useNavigate()

  const handleConfirmEmail = () => {
    startTransition(async () => {
      const { data, error } = await authClient.verifyEmail({
        query: {
          token: search.token,
        },
      })

      if (error) {
        toaster.error({
          title: 'Erro ao confirmar o e-mail',
          description: error.message,
        })
      }

      if (data) {
        await navigate({
          to: '/login',
          replace: true,
          search: {
            emailVerified: data.status,
          },
        })
      }
    })
  }

  return (
    <Alert.Root
      status="info"
      variant="surface"
      rounded="lg"
      spaceY="4"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Flex
        justify="center"
        align="center"
        p="3"
        rounded="full"
        boxSize="14"
        bg={{ _light: 'teal.100/30', _dark: 'teal.700/40' }}
      >
        <Icon as={MailCheck} boxSize="6" color="teal.500" />
      </Flex>

      <div>
        <Heading
          as="h3"
          size="xl"
          letterSpacing="wider"
          textAlign="center"
          mb="2"
        >
          Confirme seu e-mail
        </Heading>
        <Text fontSize="sm">
          Para proteger sua conta, precisamos confirmar seu endereço de e-mail.
        </Text>
      </div>

      <Flex
        flexDir="column"
        justify="center"
        align="center"
        gap="2"
        bg={{ _light: 'green.100', _dark: 'green.900/70' }}
        color={{ _light: 'green.700', _dark: 'green.300' }}
        p="3"
        rounded="xl"
      >
        <Icon as={ShieldCheck} boxSize="4" color="green.500" />
        <Box textAlign="center" spaceY="2">
          <Text fontSize="md">Verificação segura</Text>
          <Text fontSize="sm">
            Seu endereço será validado antes de liberar o acesso.
          </Text>
        </Box>
      </Flex>

      <Button
        variant="solid"
        rounded="lg"
        size="lg"
        w="full"
        onClick={handleConfirmEmail}
        loading={isPendingVerificationEmail}
      >
        Confirmar e-mail
        <ArrowRight size={5} />
      </Button>

      <Text fontSize="xs">
        Não solicitou esta confirmação? Ignore esta página.
      </Text>
    </Alert.Root>
  )
}

export default VerifyEmail
