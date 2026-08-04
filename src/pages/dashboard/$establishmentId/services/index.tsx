import { Box, Button, Card, HStack, Icon } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { BriefcaseBusiness, Plus } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import ServicesListPage from '@/features/service-establishment/pages/services.page'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/dashboard/$establishmentId/services/')({
  validateSearch: z.object({
    page: z.number().optional().default(1),
    page_size: z.number().optional().default(12),
    q: z.string().optional(),
  }),
  component: ServicesPage,
})

function ServicesPage() {
  const { establishmentId } = Route.useParams()
  const navigate = Route.useNavigate()

  return (
    <Box spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between">
        <HStack gap="2" align="center">
          <Header.Icon icon={BriefcaseBusiness} />
          <Header.Title>Serviços</Header.Title>
        </HStack>

        <Button
          variant="surface"
          colorPalette="primary"
          rounded="xl"
          size="xs"
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

      <Card.Root variant="outline" css={cardSectionCss}>
        <SearchPage mb="4" />

        <ServicesListPage />
      </Card.Root>
    </Box>
  )
}
