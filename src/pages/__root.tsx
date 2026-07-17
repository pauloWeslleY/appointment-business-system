import { Box } from '@chakra-ui/react'
import { createRootRoute, Outlet } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

interface AuthContext {
  auth: {
    isAuthenticated: boolean
  }
}

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { data } = await authClient.getSession()

    return {
      auth: {
        isAuthenticated: !!data?.session.token,
      },
    } satisfies AuthContext
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <Box colorPalette={colorDefaultTheme} w="full" h="full">
      <Outlet />
    </Box>
  )
}
