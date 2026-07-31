import { Box } from '@chakra-ui/react'
import { createRootRoute, Outlet } from '@tanstack/react-router'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { authGuard } from '@/shared/services/auth-guard'

export const Route = createRootRoute({
  beforeLoad: authGuard,
  component: RootComponent,
})

function RootComponent() {
  return (
    <Box colorPalette={colorDefaultTheme} w="full" h="full">
      <Outlet />
    </Box>
  )
}
