import { Box, HStack } from '@chakra-ui/react'
import { createFileRoute, redirect } from '@tanstack/react-router'

import Header from '@/components/layout/header'
import { toaster } from '@/components/ui/toaster'
import ListEstablishmentPage from '@/features/establishment/pages/list-establishment.page'
import { getOwnerByUserIdService } from '@/features/owner/api/owner.service'
import { authClient } from '@/lib/auth'

export const Route = createFileRoute('/_authenticated/establishment/')({
  beforeLoad: async () => {
    const { data } = await authClient.getSession()
    if (!data) throw redirect({ to: '/login' })

    try {
      await getOwnerByUserIdService(data.user.id)
    } catch (err) {
      toaster.error({
        title: (err as Error).message || 'Erro ao buscar proprietário',
      })
      throw redirect({ to: '/owner/new' })
    }
  },
  component: EstablishmentPage,
})

function EstablishmentPage() {
  return (
    <Box spaceY={{ base: '4', lg: '8' }}>
      <Header.Root>
        <HStack align="center">
          <Header.Button />
          <Header.Title lineHeight={0}>Estabelecimentos</Header.Title>
        </HStack>
      </Header.Root>

      <ListEstablishmentPage />
    </Box>
  )
}
