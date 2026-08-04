import { Box, Card, SimpleGrid } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { UserCog } from 'lucide-react'

import Header from '@/components/layout/header'
import CarduserProfile from '@/features/users/pages/card-user-profile'
import FormProfileUser from '@/features/users/pages/form-profile-user'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/_authenticated/profile/')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root align="center">
        <Header.Icon icon={UserCog} />
        <Header.Title>Perfil usuário</Header.Title>
      </Header.Root>

      <SimpleGrid gap="2" columns={{ base: 1, lg: 3 }}>
        <Card.Root variant="outline" css={cardSectionCss}>
          <CarduserProfile />
        </Card.Root>

        <Card.Root
          variant="outline"
          css={cardSectionCss}
          gridColumn={{ base: '1 / -1', lg: 'span 2' }}
          h="fit"
        >
          <FormProfileUser />
        </Card.Root>
      </SimpleGrid>
    </Box>
  )
}
