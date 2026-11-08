import { Box } from '@chakra-ui/react'
import { type QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'

import {
  ADMIN_HOSTNAME,
  ADMIN_ORIGIN,
  isLandingHostname,
} from '@/shared/config/site-domains'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

interface RouterContext {
  queryClient: QueryClient
}

const LANDING_PATHS = ['/', '/terms-of-use', '/privacy-policy']

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: ({ location }) => {
    const hostname = window.location.hostname
    const isPublicPage = LANDING_PATHS.includes(location.pathname)

    if (isLandingHostname(hostname) && !isPublicPage) {
      throw redirect({
        href: `${ADMIN_ORIGIN}${location.href}`,
        replace: true,
      })
    }

    if (hostname === ADMIN_HOSTNAME && location.pathname === '/') {
      throw redirect({ to: '/login', replace: true })
    }
  },
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
