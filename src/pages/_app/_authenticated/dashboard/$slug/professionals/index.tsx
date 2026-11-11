import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  For,
  HStack,
  Icon,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Plus, UsersRound } from 'lucide-react'

import Header from '@/components/layout/header'
import PaginationTable from '@/components/layout/pagination-table'
import SearchPage from '@/components/search-page'
import ProfessionalEditor from '@/features/professionals/components/professional-editor'
import ProfessionalTable from '@/features/professionals/components/professional-table'
import StatInfoProfessionals from '@/features/professionals/components/stat-info-professionals'
import { useProfessionalsPage } from '@/features/professionals/hooks/use-professionals-page'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/professionals/',
)({
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.PROFESSIONAL,
      action: PERMISSION_ACTIONS.READ,
    }),
  component: ProfessionalsPage,
  head: () => ({
    meta: [
      {
        title: 'Profissionais | Agendros',
      },
    ],
  }),
})

function ProfessionalsPage() {
  const {
    visibleProfessionals,
    filteredProfessionalsCount,
    professionalsSummary,
    professionalsPagination,
    handleProfessionalsPageChange,
    isLoadingProfessionals,
    professionalsError,
    retryProfessionals,
    professionalEditor,
    openProfessionalEditor,
    closeProfessionalEditor,
    professionalsScopeKey,
  } = useProfessionalsPage()
  const navigateFromProfessionalsList = Route.useNavigate()
  const slug = Route.useParams({ select: (params) => params.slug })

  const hasNoVisibleProfessionals = visibleProfessionals.length === 0
  const hasNoRegisteredProfessionals = (professionalsSummary?.total ?? 0) === 0
  const hasProfessionalsPagination =
    filteredProfessionalsCount > professionalsPagination.page_size

  const navigateToCreateProfessional = () =>
    navigateFromProfessionalsList({
      to: '/dashboard/$slug/professionals/new',
      params: { slug },
    })

  return (
    <Box key={professionalsScopeKey} spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between" align="center">
        <HStack align="center">
          <Header.Icon icon={UsersRound} />
          <Header.Title>Profissionais</Header.Title>
        </HStack>

        <Button
          colorPalette="brand"
          rounded="lg"
          size="xs"
          onClick={navigateToCreateProfessional}
        >
          <Icon as={Plus} boxSize="5" />
          Cadastrar profissional
        </Button>
      </Header.Root>

      <Box spaceY="4">
        <Flex align="center" gap="2" flexWrap="wrap">
          <SearchPage resetPagination />
        </Flex>

        {professionalsError && (
          <Alert.Root status="error" rounded="lg">
            <Alert.Indicator />
            <Alert.Title>{professionalsError.message}</Alert.Title>
            <Button rounded="lg" onClick={retryProfessionals} size="sm">
              Tentar novamente
            </Button>
          </Alert.Root>
        )}

        {isLoadingProfessionals && (
          <Stack gap="2" w="full">
            <For each={[1, 2, 3]}>
              {(item) => (
                <Skeleton
                  key={item}
                  height="60px"
                  rounded="lg"
                  bg={{ base: 'gray.200', _dark: 'gray.700/70' }}
                />
              )}
            </For>
          </Stack>
        )}

        {!isLoadingProfessionals && !professionalsError && (
          <Box spaceY="4">
            {professionalsSummary && (
              <StatInfoProfessionals summary={professionalsSummary} />
            )}

            <Card.Root variant="outline" css={cardSectionCss}>
              {hasNoVisibleProfessionals ? (
                <Alert.Root status="info" variant="subtle" rounded="lg">
                  <Alert.Indicator />
                  <Alert.Title>
                    {hasNoRegisteredProfessionals
                      ? 'Nenhum profissional cadastrado.'
                      : 'Nenhum profissional corresponde à busca.'}
                  </Alert.Title>
                </Alert.Root>
              ) : (
                <ProfessionalTable
                  professionals={visibleProfessionals}
                  onEdit={openProfessionalEditor}
                />
              )}
            </Card.Root>

            {hasProfessionalsPagination && (
              <PaginationTable
                count={filteredProfessionalsCount}
                page={professionalsPagination.page}
                pageSize={professionalsPagination.page_size}
                onPageChange={handleProfessionalsPageChange}
              />
            )}
          </Box>
        )}
      </Box>

      {professionalEditor && (
        <ProfessionalEditor
          key={`${professionalsScopeKey}:${professionalEditor.professionalId}`}
          professionalId={professionalEditor.professionalId}
          onClose={closeProfessionalEditor}
        />
      )}
    </Box>
  )
}
