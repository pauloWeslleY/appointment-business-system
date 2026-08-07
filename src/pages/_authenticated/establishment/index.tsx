import { Box, Button, Card, HStack, Icon } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon, Store } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
import ListEstablishmentPage from '@/features/establishment/pages/list-establishment.page'
import { validationEstablishmentExistsRouteHome } from '@/features/establishment/validations/validation-establishment-exists.route'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/_authenticated/establishment/')({
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  beforeLoad: async () => await validationEstablishmentExistsRouteHome(),
  component: EstablishmentPage,
})

function EstablishmentPage() {
  const navigate = Route.useNavigate()

  return (
    <Box spaceY={{ base: '4', lg: '8' }}>
      <Header.Root justify="space-between" align="center">
        <HStack gap="2" align="center">
          <Header.Icon icon={Store} />
          <Header.Title>Estabelecimentos</Header.Title>
        </HStack>

        <Button
          rounded="xl"
          size="xs"
          variant="surface"
          colorPalette="emerald"
          onClick={() => navigate({ to: '/establishment/new' })}
        >
          <Icon as={PlusIcon} boxSize="5" />
          Novo estabelecimento
        </Button>
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <ListEstablishmentPage />
      </Card.Root>
    </Box>
  )
}
