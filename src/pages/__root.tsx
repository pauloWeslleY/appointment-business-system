import { Box } from '@chakra-ui/react'
import { type QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from '@tanstack/react-router'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <NuqsAdapter>
      <HeadContent />

      <Box colorPalette={colorDefaultTheme} w="full" h="full">
        <Outlet />
      </Box>
    </NuqsAdapter>
  )
}
