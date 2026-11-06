import { createFileRoute } from '@tanstack/react-router'

import AccessDenied from '@/components/layout/access-denied'

export const Route = createFileRoute('/_error_page/access-denied/')({
  head: () => ({
    meta: [{ title: 'Acesso negado' }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <AccessDenied />
}
