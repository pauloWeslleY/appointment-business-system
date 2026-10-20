import { Box } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { UserSquare2 } from 'lucide-react'

import Header from '@/components/layout/header'
import CardOrganizationProfileSummary from '@/features/organization-profile/components/card-organization-profile-stats'
import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'
import { getFullOrganization } from '@/features/organization-profile/services/organization.service'

export const Route = createFileRoute('/_authenticated/business-profile/')({
  loader: async ({ context }) => {
    const organizationProfile = await context.queryClient.query(
      organizationProfileSummaryQueryOptions(),
    )
    const { data, error } = await getFullOrganization(
      organizationProfile.organizationId,
    )

    if (error) {
      throw new Error(`Failed to fetch organization: ${error.message}`)
    }

    return {
      organizationProfile,
      organization: data,
    }
  },
  component: BusinessProfilePage,
})

function BusinessProfilePage() {
  const { organizationProfile, organization } = Route.useLoaderData()

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Icon icon={UserSquare2} />
        <Header.Title>Perfil Empresarial</Header.Title>
      </Header.Root>

      <CardOrganizationProfileSummary
        organizationProfile={organizationProfile}
        organization={organization}
      />
    </Box>
  )
}
