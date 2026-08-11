import { Box, Card, HStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { PencilLine } from 'lucide-react'

import Header from '@/components/layout/header'
import FormUpdateServiceEstablishment from '@/features/service-establishment/pages/form-update-service-establishment'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/dashboard/$slug/services/_pages/$serviceEstablishmentId/edit/',
)({
  component: EditServiceEstablishmentPage,
})

function EditServiceEstablishmentPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Button />

        <HStack gap="2" align="center">
          <Header.Icon icon={PencilLine} />
          <Header.Title>Atualizar Serviço</Header.Title>
        </HStack>
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <FormUpdateServiceEstablishment />
      </Card.Root>
    </Box>
  )
}
