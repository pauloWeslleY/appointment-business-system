import { Box, Card, Flex } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Settings2 } from 'lucide-react'

import Header from '@/components/layout/header'
import DialogFormCreateTaxInformation from '@/features/tax-information/components/dialog-create-tax-information'
import LegalEntitiesTable from '@/features/tax-information/components/table-legal-entities'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/_authenticated/settings/')({
  component: BusinessProfilePage,
  head: () => ({
    meta: [{ title: 'Configurações' }],
  }),
})

function BusinessProfilePage() {
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
    </Box>
  )
}
