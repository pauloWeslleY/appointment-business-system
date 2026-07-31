import { Box, Card, HStack, SimpleGrid } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import Header from '@/components/layout/header'
import CarduserProfile from '@/features/users/pages/card-user-profile'
import FormProfileUser from '@/features/users/pages/form-profile-user'

export const Route = createFileRoute('/_authenticated/profile/')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root justify="space-between">
        <HStack align="center">
          <Header.Button />
          <div>
            <Header.Title>Perfil usuário</Header.Title>
            <Header.SubTitle>Dados gerais do usuário</Header.SubTitle>
          </div>
        </HStack>
      </Header.Root>

      <SimpleGrid gap="2" columns={{ base: 1, lg: 3 }}>
        <Card.Root
          variant="outline"
          rounded="xl"
          shadow="xs"
          bg={{ base: 'white', _dark: 'gray.950/40' }}
          borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
        >
          <CarduserProfile />
        </Card.Root>

        <Card.Root
          gridColumn={{ base: '1 / -1', lg: 'span 2' }}
          variant="outline"
          rounded="xl"
          shadow="xs"
          bg={{ base: 'white', _dark: 'gray.950/40' }}
          borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
          h="fit"
        >
          <FormProfileUser />
        </Card.Root>
      </SimpleGrid>
    </Box>
  )
}
