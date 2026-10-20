import { Box, SimpleGrid } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Building2, UserSquare2 } from 'lucide-react'

import Header from '@/components/layout/header'
import { validateEnsureOrganizationExists } from '@/features/authentication/validations/validate-organization-exists'
import CardOrganizationProfileSummary from '@/features/organization-profile/components/card-organization-profile-stats'
import SummaryOrganizationProfile from '@/features/organization-profile/components/summary-organization-profile'
import FormUpdateOrganizationProfile from '@/features/organization-profile/pages/form-update-organization-profile'
import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'
import { getFullOrganization } from '@/features/organization-profile/services/organization.service'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { formattedPhone } from '@/shared/utils/formatted-mask'

export const Route = createFileRoute('/_authenticated/organization/')({
  beforeLoad: async () => validateEnsureOrganizationExists(),
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
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationProfile, organization } = Route.useLoaderData()
  const loadListDataOrganizationProfile = [
    { label: 'Razão Social', value: organizationProfile.legalName },
    { label: 'Nome Fantasia', value: organizationProfile.tradeName },
    { label: 'E-mail', value: organizationProfile.email },
    { label: 'Telefone', value: formattedPhone(organizationProfile.phone) },
    {
      label: 'Criada em',
      value: formattedDateAndHours(organization.createdAt),
    },
  ]

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root align="center">
        <Header.Icon icon={Building2} />
        <Header.Title>Perfil Empresarial</Header.Title>
      </Header.Root>

      <CardOrganizationProfileSummary
        organizationProfile={organizationProfile}
        organization={organization}
      />

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
        <SummaryOrganizationProfile
          icon={UserSquare2}
          title="Dados empresariais"
          data={loadListDataOrganizationProfile}
        />
        <FormUpdateOrganizationProfile />
      </SimpleGrid>
    </Box>
  )
}
