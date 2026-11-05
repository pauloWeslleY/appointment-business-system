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
  Table,
} from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { Plus, UserRoundCog, UsersRound } from 'lucide-react'

import Header from '@/components/layout/header'
import PaginationTable from '@/components/layout/pagination-table'
import SearchPage from '@/components/search-page'
import { cardSectionCss } from '@/theme/styles/global-styles'

import ProfessionalEditor from '../components/professional-editor'
import StatInfoProfessionals from '../components/stat-info-professionals'
import { useProfessionalsPage } from '../hooks/use-professionals-page'

const professionalsRoute = getRouteApi('/dashboard/$slug/professionals/')

const ProfessionalsPage = () => {
  const {
    professionals,
    visibleProfessionals,
    filteredCount,
    pagination,
    handlePaginationChange,
    isLoading,
    error,
    retryProfessionals,
    editor,
    openUpdateProfessional,
    closeProfessionalEditor,
    scopeKey,
  } = useProfessionalsPage()
  const navigate = professionalsRoute.useNavigate()
  const slug = professionalsRoute.useParams({
    select: (params) => params.slug,
  })

  return (
    <Box key={scopeKey} spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between" align="center">
        <HStack align="center" gap="2">
          <Header.Icon icon={UsersRound} />
          <Header.Title>Profissionais</Header.Title>
        </HStack>

        <Button
          colorPalette="brand"
          rounded="xl"
          size="xs"
          onClick={() =>
            navigate({
              to: '/dashboard/$slug/professionals/new',
              params: { slug },
            })
          }
        >
          <Icon as={Plus} boxSize="5" />
          Cadastrar profissional
        </Button>
      </Header.Root>

      {isLoading && (
        <Stack gap="2" w="full" p="2">
          <Skeleton height="60px" rounded="lg" />
          <Skeleton height="60px" rounded="lg" />
          <Skeleton height="60px" rounded="lg" />
        </Stack>
      )}

      {error && (
        <Alert.Root status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{error.message}</Alert.Title>
            <Button onClick={retryProfessionals} size="sm" mt="2">
              Tentar novamente
            </Button>
          </Alert.Content>
        </Alert.Root>
      )}

      {!isLoading && !error && (
        <Box spaceY="4">
          <StatInfoProfessionals professionals={professionals} />

          <Flex gap="2" align="center" flexWrap="wrap">
            <SearchPage />
          </Flex>

          <Card.Root
            variant="outline"
            css={cardSectionCss}
            overflowX="auto"
            maxW="full"
            tabIndex={0}
            aria-label="Profissionais: role para ver todas as colunas"
          >
            {visibleProfessionals.length === 0 ? (
              <Alert.Root status="info" rounded="xl">
                <Alert.Indicator />
                <Alert.Title>
                  {professionals.length === 0
                    ? 'Nenhum profissional cadastrado.'
                    : 'Nenhum profissional corresponde à busca.'}
                </Alert.Title>
              </Alert.Root>
            ) : (
              <Table.Root minW="36rem">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Nome</Table.ColumnHeader>
                    <Table.ColumnHeader>Especialidade</Table.ColumnHeader>
                    <Table.ColumnHeader>Sobre</Table.ColumnHeader>
                    <Table.ColumnHeader>Ações</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {visibleProfessionals.map((professional) => (
                    <Table.Row key={professional.id}>
                      <Table.Cell>{professional.displayName}</Table.Cell>
                      <Table.Cell>{professional.specialty}</Table.Cell>
                      <Table.Cell>{professional.bio ?? '—'}</Table.Cell>
                      <Table.Cell>
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() =>
                            openUpdateProfessional(professional.id)
                          }
                        >
                          <Icon as={UserRoundCog} />
                          Detalhes e edição
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            )}
          </Card.Root>
        </Box>
      )}
      {filteredCount > pagination.page_size && (
        <PaginationTable
          count={filteredCount}
          page={pagination.page}
          pageSize={pagination.page_size}
          onPageChange={handlePaginationChange}
        />
      )}

      {editor && (
        <ProfessionalEditor
          key={scopeKey + ':' + editor.professionalId}
          professionalId={editor.professionalId}
          onClose={closeProfessionalEditor}
        />
      )}
    </Box>
  )
}

export default ProfessionalsPage
