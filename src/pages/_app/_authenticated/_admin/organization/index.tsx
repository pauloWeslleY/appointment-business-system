import { Box, Button, Grid, HStack, Icon } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Building2, PlusIcon, UserSquare2 } from 'lucide-react'

import Header from '@/components/layout/header'
import PageLoader from '@/components/page-loader'
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
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { usePermissions } from '@/shared/hooks/use-permissions'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { formattedPhone } from '@/shared/utils/formatted-mask'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const Route = createFileRoute(
  '/_app/_authenticated/_admin/organization/',
)({
  pendingComponent: PageLoader,
  beforeLoad: async ({ context }) => {
    validateRoutePermission(context.memberContext, {
      resource: RESOURCES.ORGANIZATION_PROFILE,
      action: PERMISSION_ACTIONS.READ,
    })

    return validateEnsureOrganizationExists()
  },
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
        title: 'Perfil Empresarial | Agendros',
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
      value: formattedDateAndHours(organization.createdAt, true),
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
          <Button asChild rounded="lg" size="xs" colorPalette="brand">
            <Link to="/organization/new">
              <Icon as={PlusIcon} boxSize="5" />
              Novo perfil empresarial
            </Link>
          </Button>
        )}
      </Header.Root>

      <>
        <CardOrganizationProfileSummary
          organizationProfile={organizationProfile}
          organization={organization}
        />

        <Grid
          templateColumns={{
            base: '1fr',
            xl: organizationProfilePermission.canUpdate ? `400px 1fr` : '1fr',
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
        </Grid>

        {organizationProfilePermission.canUpdate && <ActiveOrganization />}
      </>
    </Box>
  )
}
