import { Box, Button, HStack, Icon, SimpleGrid } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Building2, PlusIcon, UserSquare2 } from 'lucide-react'

import Header from '@/components/layout/header'
import { validateEnsureOrganizationExists } from '@/features/authentication/validations/validate-organization-exists'
import ActiveOrganization from '@/features/organization-profile/components/active-organization'
import CardOrganizationProfileSummary from '@/features/organization-profile/components/card-organization-profile-stats'
import SummaryOrganizationProfile from '@/features/organization-profile/components/summary-organization-profile'
import ErrorOrganizationPage from '@/features/organization-profile/pages/error-page'
import FormUpdateOrganizationProfile from '@/features/organization-profile/pages/form-update-organization-profile'
import {
  organizationDetailQueryOptions,
  organizationProfileSummaryQueryOptions,
} from '@/features/organization-profile/queries/organization-profile-query-options'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { formattedPhone } from '@/shared/utils/formatted-mask'

export const Route = createFileRoute('/_authenticated/organization/')({
  beforeLoad: async () => validateEnsureOrganizationExists(),
  loader: async ({ context }) => {
    const organizationProfile = await context.queryClient.query(
      organizationProfileSummaryQueryOptions(),
    )
    const organization = await context.queryClient.query(
      organizationDetailQueryOptions(organizationProfile.organizationId),
    )

    return {
      organization,
      organizationProfile,
    }
  },
  component: OrganizationPage,
  errorComponent: ErrorOrganizationPage,
})

function OrganizationPage() {
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
      <Header.Root align="center" justify="space-between">
        <HStack align="center">
          <Header.Icon icon={Building2} />
          <Header.Title>Perfil Empresarial</Header.Title>
        </HStack>

        <Button rounded="lg" size="xs" asChild>
          <Link to="/organization/create">
            <Icon as={PlusIcon} boxSize="5" />
            Novo perfil empresarial
          </Link>
        </Button>
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

      <ActiveOrganization />
    </Box>
  )
}
