import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  For,
  HStack,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  Table,
} from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { Plus, UserRoundCog, UsersRound } from 'lucide-react'

import Header from '@/components/layout/header'
import PaginationTable from '@/components/layout/pagination-table'
import SearchPage from '@/components/search-page'
import { Tooltip } from '@/components/ui/tooltip'
import { cardSectionCss, cssTableColumns } from '@/theme/styles/global-styles'

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
          rounded="lg"
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
            <Button rounded="lg" onClick={retryProfessionals} size="sm" mt="2">
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

          <Card.Root variant="outline" css={cardSectionCss}>
            {visibleProfessionals.length === 0 ? (
              <Alert.Root status="info" variant="subtle" rounded="lg">
                <Alert.Indicator />
                <Alert.Title>
                  {professionals.length === 0
                    ? 'Nenhum profissional cadastrado.'
                    : 'Nenhum profissional corresponde à busca.'}
                </Alert.Title>
              </Alert.Root>
            ) : (
              <Table.ScrollArea
                tabIndex={0}
                maxW="full"
                aria-label="Profissionais: role para ver todas as colunas"
                rounded="lg"
                borderColor={{ _light: 'slate.200', _dark: 'slate.900/60' }}
              >
                <Table.Root variant="outline" minW="36rem">
                  <Table.Header>
                    <Table.Row
                      bg={{ _light: 'slate.200', _dark: 'slate.900/60' }}
                    >
                      <For each={['Nome', 'Especialidade', 'Sobre']}>
                        {(column) => (
                          <Table.ColumnHeader key={column} {...cssTableColumns}>
                            {column}
                          </Table.ColumnHeader>
                        )}
                      </For>
                      <Table.ColumnHeader
                        textAlign="right"
                        {...cssTableColumns}
                      >
                        Ações
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {visibleProfessionals.map((professional) => (
                      <Table.Row
                        key={professional.id}
                        bg={{ _light: 'slate.50', _dark: 'slate.950/60' }}
                      >
                        <Table.Cell>{professional.displayName}</Table.Cell>
                        <Table.Cell>{professional.specialty}</Table.Cell>
                        <Table.Cell>{professional.bio ?? '—'}</Table.Cell>
                        <Table.Cell textAlign="right">
                          <Tooltip content="Detalhes e edição" showArrow>
                            <IconButton
                              size="xs"
                              variant="ghost"
                              rounded="lg"
                              aria-label={`Detalhes e edição de ${professional.displayName}`}
                              onClick={() =>
                                openUpdateProfessional(professional.id)
                              }
                            >
                              <Icon as={UserRoundCog} />
                            </IconButton>
                          </Tooltip>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>
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
