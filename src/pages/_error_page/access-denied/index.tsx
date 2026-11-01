import { createFileRoute } from '@tanstack/react-router'

import AccessDenied from '@/components/layout/access-denied'

export const Route = createFileRoute('/_error_page/access-denied/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AccessDenied />
}
