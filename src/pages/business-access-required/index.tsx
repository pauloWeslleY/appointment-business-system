import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { CalendarDays, ShieldAlert } from 'lucide-react'

import Logotipo from '@/components/logotipo'
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
        <Box color={{ base: 'sea.700', _dark: 'sea.300' }}>
          <ShieldAlert size={32} />
        </Box>
        <Heading size="xl">Esta conta não possui acesso empresarial</Heading>
        <Text color={{ base: 'slate.600', _dark: 'slate.400' }}>
          Você pode continuar agendando pela área de clientes. Para entrar no
          painel, é necessário um vínculo ativo com uma empresa ou um novo
          cadastro empresarial autorizado.
        </Text>
        <Text fontSize="sm" color={{ base: 'slate.600', _dark: 'slate.400' }}>
          Se você trabalha em uma empresa, solicite um convite ao responsável.
          Se seu vínculo foi suspenso ou revogado, entre em contato com ele.
        </Text>
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
