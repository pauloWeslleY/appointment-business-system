import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { CalendarDays, ShieldAlert } from 'lucide-react'

import Logotipo from '@/components/logotipo'
import { useStartBusinessOnboarding } from '@/features/authentication/hooks/use-start-business-onboarding'
import { getCustomerHref } from '@/shared/config/site-domains'
import { useLogout } from '@/shared/hooks/use-logout'

export const Route = createFileRoute('/business-access-required/')({
  head: () => ({
    meta: [{ title: 'Acesso empresarial necessário | Agendros' }],
  }),
  component: BusinessAccessRequired,
})

function BusinessAccessRequired() {
  const { handleLogout } = useLogout()
  const {
    mutate: onboarding,
    error: errorOnboarding,
    isPending: isPendingOnboarding,
  } = useStartBusinessOnboarding()

  const handleOnboarding = () => {
    onboarding()
  }

  return (
    <Container maxW="lg" py={{ base: '10', md: '24' }}>
      <Stack
        align="start"
        gap="6"
        borderWidth="1px"
        rounded="2xl"
        p={{ base: '6', md: '9' }}
      >
        <Logotipo variant="horizontal" w="150px" />
        <Box color={{ _light: 'sea.700', _dark: 'sea.300' }}>
          <ShieldAlert size={32} />
        </Box>
        <Heading size="xl">Esta conta não possui acesso empresarial</Heading>
        <Text color={{ _light: 'slate.600', _dark: 'slate.400' }}>
          Você pode continuar agendando pela área de clientes. Para entrar no
          painel, é necessário um vínculo ativo com uma empresa ou um novo
          cadastro empresarial autorizado.
        </Text>

        <Text fontSize="sm" color={{ _light: 'slate.600', _dark: 'slate.400' }}>
          Se você trabalha em uma empresa, solicite um convite ao responsável.
          Se seu vínculo foi suspenso ou revogado, entre em contato com ele.
        </Text>

        <Stack gap="3" w="full" borderWidth="1px" rounded="xl" p="4">
          <Text fontWeight="semibold">É sua primeira empresa no Agendros?</Text>
          <Text
            fontSize="sm"
            color={{ _light: 'slate.600', _dark: 'slate.400' }}
          >
            Inicie o cadastro com esta conta. Você se tornará proprietário ao
            criar sua empresa. Isso não libera acesso a empresas de outras
            pessoas.
          </Text>

          <Button
            rounded="lg"
            onClick={handleOnboarding}
            disabled={isPendingOnboarding}
            loading={isPendingOnboarding}
            loadingText="Preparando cadastro..."
          >
            Cadastrar minha empresa
          </Button>

          {errorOnboarding && (
            <Text
              role="alert"
              color={{ _light: 'red.600', _dark: 'red.300' }}
              fontSize="sm"
            >
              {errorOnboarding.message}
            </Text>
          )}
        </Stack>

        <Button asChild rounded="lg">
          <a href={getCustomerHref()}>
            <CalendarDays size={18} />
            Área do cliente
          </a>
        </Button>
        <Button variant="outline" onClick={handleLogout} rounded="lg">
          Sair e usar outra conta
        </Button>
      </Stack>
    </Container>
  )
}
