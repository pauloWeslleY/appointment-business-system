import { createFileRoute } from '@tanstack/react-router'

import { validateEnsureOrganizationExists } from '@/features/authentication/validations/validate-organization-exists'

export const Route = createFileRoute('/_authenticated/organization/')({
  beforeLoad: async () => validateEnsureOrganizationExists(),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/organization/"!</div>
}
