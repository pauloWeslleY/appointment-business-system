import { Box } from '@chakra-ui/react'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <Box colorPalette={colorDefaultTheme} w="full" h="full">
      <Outlet />
    </Box>
  )
}
