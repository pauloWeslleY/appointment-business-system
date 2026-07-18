import { Box, Card, HStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import Header from '@/components/layout/header'
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
          <Header.Title lineHeight={0}>Perfil usuário</Header.Title>
        </HStack>
      </Header.Root>

      <Card.Root
        variant="outline"
        rounded="xl"
        bg={{ base: 'white', _dark: 'gray.950/40' }}
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
        <FormProfileUser />
      </Card.Root>
    </Box>
  )
}
