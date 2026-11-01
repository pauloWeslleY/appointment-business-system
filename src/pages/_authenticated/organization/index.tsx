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
import { RESOURCES } from '@/shared/constants/permission'
import { usePermissions } from '@/shared/hooks/use-permissions'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { formattedPhone } from '@/shared/utils/formatted-mask'

export const Route = createFileRoute('/_authenticated/organization/')({
  beforeLoad: () => validateEnsureOrganizationExists(),
  loader: async ({ context }) => {
    const [organizationProfile, organization] = await Promise.all([
      context.queryClient.query(organizationProfileSummaryQueryOptions()),
      context.queryClient.query(
        organizationDetailQueryOptions(context.memberContext.organization.id),
      ),
    ])

    return { organization, organizationProfile }
  },
  component: OrganizationPage,
  errorComponent: ErrorOrganizationPage,
  head: () => ({
    meta: [
      {
        title: 'Perfil Empresarial',
      },
    ],
  }),
})

function OrganizationPage() {
  const { organizationProfile, organization } = Route.useLoaderData()
  const { organizationProfile: organizationProfilePermission } = usePermissions(
    [RESOURCES.ORGANIZATION_PROFILE],
  )
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

        {organizationProfilePermission.canCreate && (
          <Button rounded="lg" size="xs" asChild>
            <Link to="/organization/create">
              <Icon as={PlusIcon} boxSize="5" />
              Novo perfil empresarial
            </Link>
          </Button>
        )}
      </Header.Root>

      <CardOrganizationProfileSummary
        organizationProfile={organizationProfile}
        organization={organization}
      />

      <SimpleGrid
        columns={{
          base: 1,
          lg: organizationProfilePermission.canUpdate ? 2 : 1,
        }}
        gap="4"
      >
        <SummaryOrganizationProfile
          title="Dados empresariais"
          icon={UserSquare2}
          data={loadListDataOrganizationProfile}
        />

        {organizationProfilePermission.canUpdate && (
          <FormUpdateOrganizationProfile />
        )}
      </SimpleGrid>

      {organizationProfilePermission.canUpdate && <ActiveOrganization />}
    </Box>
  )
}
