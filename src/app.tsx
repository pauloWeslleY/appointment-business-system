import 'dayjs/locale/pt-br'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'

import AppError from './components/layout/app-error'
import NotFoundPage from './components/layout/not-found'
import PageLoader from './components/page-loader'
import { Provider as ThemeProvider } from './components/ui/provider'
import { Toaster } from './components/ui/toaster'
import { routeTree } from './routeTree.gen'
dayjs.locale('pt-br')

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPendingComponent: PageLoader,
  defaultErrorComponent: AppError,
  defaultNotFoundComponent: NotFoundPage,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  )
}

export default App
