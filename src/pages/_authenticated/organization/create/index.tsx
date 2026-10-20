import { createFileRoute } from '@tanstack/react-router'

import FormCreateOrganizationProfile from '@/features/organization-profile/pages/form-create-organization-profile'

export const Route = createFileRoute('/_authenticated/organization/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FormCreateOrganizationProfile />
}
