import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Icon,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { Plus, UsersRound } from 'lucide-react'

import Header from '@/components/layout/header'
import PaginationTable from '@/components/layout/pagination-table'
import SearchPage from '@/components/search-page'
import { cardSectionCss } from '@/theme/styles/global-styles'

import ProfessionalEditor from '../components/professional-editor'
import ProfessionalTable from '../components/professional-table'
import StatInfoProfessionals from '../components/stat-info-professionals'
import { useProfessionalsPage } from '../hooks/use-professionals-page'

const professionalsListRoute = getRouteApi(
  '/_app/_authenticated/dashboard/$slug/professionals/',
)

const ProfessionalsPage = () => {
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
  const navigateFromProfessionalsList = professionalsListRoute.useNavigate()
  const slug = professionalsListRoute.useParams({
    select: (params) => params.slug,
  })

  return (
    <Box key={professionalsScopeKey} spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between" align="center">
        <HStack align="center" gap="2">
          <Header.Icon icon={UsersRound} />
          <Header.Title>Profissionais</Header.Title>
        </HStack>

        <Button
          colorPalette="brand"
          rounded="lg"
          size="xs"
          onClick={() =>
            navigateFromProfessionalsList({
              to: '/dashboard/$slug/professionals/new',
              params: { slug },
            })
          }
        >
          <Icon as={Plus} boxSize="5" />
          Cadastrar profissional
        </Button>
      </Header.Root>

      {isLoadingProfessionals && (
        <Stack gap="2" w="full" p="2">
          <Skeleton height="60px" rounded="lg" />
          <Skeleton height="60px" rounded="lg" />
          <Skeleton height="60px" rounded="lg" />
        </Stack>
      )}

      {professionalsError && (
        <Alert.Root status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{professionalsError.message}</Alert.Title>
            <Button rounded="lg" onClick={retryProfessionals} size="sm" mt="2">
              Tentar novamente
            </Button>
          </Alert.Content>
        </Alert.Root>
      )}

      <Flex gap="2" align="center" flexWrap="wrap">
        <SearchPage resetPagination />
      </Flex>

      {!isLoadingProfessionals && !professionalsError && (
        <Box spaceY="4">
          {professionalsSummary && (
            <StatInfoProfessionals summary={professionalsSummary} />
          )}

          <Card.Root variant="outline" css={cardSectionCss}>
            {visibleProfessionals.length === 0 ? (
              <Alert.Root status="info" variant="subtle" rounded="lg">
                <Alert.Indicator />
                <Alert.Title>
                  {(professionalsSummary?.total ?? 0) === 0
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
        </Box>
      )}
      {filteredProfessionalsCount > professionalsPagination.page_size && (
        <PaginationTable
          count={filteredProfessionalsCount}
          page={professionalsPagination.page}
          pageSize={professionalsPagination.page_size}
          onPageChange={handleProfessionalsPageChange}
        />
      )}

      {professionalEditor && (
        <ProfessionalEditor
          key={professionalsScopeKey + ':' + professionalEditor.professionalId}
          professionalId={professionalEditor.professionalId}
          onClose={closeProfessionalEditor}
        />
      )}
    </Box>
  )
}

export default ProfessionalsPage
