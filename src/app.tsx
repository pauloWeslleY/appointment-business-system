import 'dayjs/locale/pt-br'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createRouter,
  ErrorComponent,
  RouterProvider,
} from '@tanstack/react-router'
import dayjs from 'dayjs'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'

import PageLoader from './components/page-loader'
import { Provider as ThemeProvider } from './components/ui/provider'
import { Toaster } from './components/ui/toaster'
import { routeTree } from './routeTree.gen'
dayjs.locale('pt-br')

const router = createRouter({
  routeTree,
  defaultPendingComponent: PageLoader,
  defaultErrorComponent: ErrorComponent,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const makeQueryClient = () => new QueryClient()

const App = () => {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={makeQueryClient()}>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  )
}

export default App
