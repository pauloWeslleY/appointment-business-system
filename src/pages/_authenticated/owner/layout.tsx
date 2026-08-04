import { Box } from '@chakra-ui/react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { UserSquare2 } from 'lucide-react'

import Header from '@/components/layout/header'

export const Route = createFileRoute('/_authenticated/owner')({
  component: OwnerLayout,
})

function OwnerLayout() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Icon icon={UserSquare2} />
        <Header.Title>Proprietário</Header.Title>
      </Header.Root>

      <Outlet />
    </Box>
  )
}
