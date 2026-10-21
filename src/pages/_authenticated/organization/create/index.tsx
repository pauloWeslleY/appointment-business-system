import { Box, Card, Stack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Building2 } from 'lucide-react'

import Header from '@/components/layout/header'
import FormCreateOrganizationProfile from '@/features/organization-profile/pages/form-create-organization-profile'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/_authenticated/organization/create/')({
  component: CreateOrganizationProfile,
})

function CreateOrganizationProfile() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root align="center">
        <Header.Button />
        <Header.Icon icon={Building2} />
        <Stack gap="0">
          <Header.Title>Cadastre seu perfil empresarial</Header.Title>
          <Header.SubTitle>
            Preencha os dados da sua empresa para começar a utilizar o sistema.
          </Header.SubTitle>
        </Stack>
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss} h="fit">
        <Card.Header>
          <Card.Title>Dados da empresa</Card.Title>
          <Card.Description>
            Informe os dados de identificação e contato.
          </Card.Description>
        </Card.Header>

        <Card.Body>
          <FormCreateOrganizationProfile />
        </Card.Body>
      </Card.Root>
    </Box>
  )
}
