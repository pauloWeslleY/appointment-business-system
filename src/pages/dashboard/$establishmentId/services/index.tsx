import { Box, Button, HStack, Icon } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import Header from '@/components/layout/header'

import ServicesTable from './-components/services-table'

export const Route = createFileRoute('/dashboard/$establishmentId/services/')({
  component: ServicesPage,
})

function ServicesPage() {
  const { establishmentId } = Route.useParams()
  const navigate = Route.useNavigate()

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root justify="space-between">
        <HStack align="center">
          <Header.Button />

          <div>
            <Header.Title>Serviços</Header.Title>
            <Header.SubTitle>Gerencie seus serviços</Header.SubTitle>
          </div>
        </HStack>

        <Button
          rounded="xl"
          size="sm"
          onClick={() =>
            navigate({
              to: '/dashboard/$establishmentId/services/new',
              params: { establishmentId },
            })
          }
        >
          <Icon as={Plus} boxSize="5" />
          Cadastrar Serviço
        </Button>
      </Header.Root>

      <ServicesTable />
    </Box>
  )
}
