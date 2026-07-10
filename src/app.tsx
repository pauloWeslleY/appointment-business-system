import 'dayjs/locale/pt-br'

import {
  createRouter,
  ErrorComponent,
  RouterProvider,
} from '@tanstack/react-router'
import dayjs from 'dayjs'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'

import { Provider as ThemeProvider } from './components/ui/provider'
import { routeTree } from './routeTree.gen'
dayjs.locale('pt-br')

const router = createRouter({
  routeTree,
  // defaultPendingComponent: DefaultPending,
  defaultErrorComponent: ErrorComponent,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </NuqsAdapter>
  )
}

export default App
