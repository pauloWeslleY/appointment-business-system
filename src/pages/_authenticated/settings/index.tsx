import { Box, Card, Flex, Grid, GridItem, Image } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Settings2 } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
import MeAccess from '@/components/me-access'
import EstablishmentsListGoogleCalendar from '@/features/google-calendar/components/establishments-list-google-calendar'
import DialogFormCreateTaxInformation from '@/features/tax-information/components/dialog-create-tax-information'
import LegalEntitiesTable from '@/features/tax-information/components/table-legal-entities'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/_authenticated/settings/')({
  validateSearch: z.object({
    q: z.string().optional(),
    limit: z.number().optional().default(5),
    next: z.string().optional(),
    status: z.string().optional(),
  }),
  component: SettingsPage,
  head: () => ({
    meta: [{ title: 'Configurações' }],
  }),
})

function SettingsPage() {
  const { memberContext } = Route.useRouteContext()

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Icon icon={Settings2} />
        <Flex flexDir="column">
          <Header.Title>Configurações</Header.Title>
          <Header.SubTitle>
            Consulte os dados fiscais, seu acesso e as integrações da
            organização.
          </Header.SubTitle>
        </Flex>
      </Header.Root>

      <Box spaceY="4">
        <Card.Root variant="outline" {...cardSectionCss}>
          <Card.Header
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            px="0"
            pt="0"
          >
            <div>
              <Card.Title>Cadastro Fiscal</Card.Title>
              <Card.Description>
                Dados fiscais vinculados à empresa.
              </Card.Description>
            </div>

            <DialogFormCreateTaxInformation />
          </Card.Header>

          <LegalEntitiesTable />
        </Card.Root>

        <Grid templateColumns={{ base: '1fr', lg: '600px 1fr' }} gap="4">
          <GridItem asChild>
            <MeAccess access={memberContext} />
          </GridItem>

          <Card.Root variant="outline" {...cardSectionCss}>
            <Card.Header
              display="flex"
              flexDir="row"
              alignItems="center"
              px="0"
              pt="0"
              mb="2"
            >
              <Image
                src="/google-calendar.png"
                alt="Logo Google Calendar"
                boxSize="8"
                mr="2"
              />

              <div>
                <Card.Title>Integrações</Card.Title>
                <Card.Description>
                  Conexões de calendário por estabelecimento.
                </Card.Description>
              </div>
            </Card.Header>

            <EstablishmentsListGoogleCalendar />
          </Card.Root>
        </Grid>
      </Box>
    </Box>
  )
}
