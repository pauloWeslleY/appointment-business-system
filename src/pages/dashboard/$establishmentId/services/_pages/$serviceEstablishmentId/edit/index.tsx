import { Box, Card, Flex, HStack, Icon } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { PencilLine } from 'lucide-react'

import Header from '@/components/layout/header'
import FormUpdateServiceEstablishment from '@/features/service-establishment/pages/form-update-service-establishment'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/dashboard/$establishmentId/services/_pages/$serviceEstablishmentId/edit/',
)({
  component: EditServiceEstablishmentPage,
})

function EditServiceEstablishmentPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Button />
        <HStack gap="2" align="center">
          <Flex
            align="center"
            justify="center"
            boxSize="8"
            rounded="full"
            bg={{ base: 'primary.200/60', _dark: 'primary.700/80' }}
          >
            <Icon
              as={PencilLine}
              boxSize="4"
              color={{ base: 'primary.400', _dark: 'primary.200' }}
            />
          </Flex>
          <Header.Title>Atualizar Serviço</Header.Title>
        </HStack>
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <FormUpdateServiceEstablishment />
      </Card.Root>
    </Box>
  )
}
