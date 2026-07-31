import { Box, Button, Card, HStack, Icon } from '@chakra-ui/react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import ServicesTablePage from '@/features/service-establishment/pages/services-table.page'

export const Route = createFileRoute('/dashboard/$establishmentId/services/')({
  validateSearch: z.object({
    page: z.number().optional(),
    page_size: z.number().optional(),
    q: z.string().optional(),
  }),
  beforeLoad: ({ search, params }) => {
    if (!search.page) {
      throw redirect({
        to: '/dashboard/$establishmentId/services',
        params: {
          establishmentId: params.establishmentId,
        },
        search: { page: 1 },
      })
    }
  },
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

      <Card.Root
        variant="outline"
        rounded="xl"
        shadow="xs"
        p="4"
        bg={{ base: 'white', _dark: 'gray.950/40' }}
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
        <SearchPage mb="4" />

        <ServicesTablePage />
      </Card.Root>
    </Box>
  )
}
