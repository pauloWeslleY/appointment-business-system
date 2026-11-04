import {
  Alert,
  Box,
  Button,
  Card,
  HStack,
  Input,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'

import Header from '@/components/layout/header'
import PaginationTable from '@/components/layout/pagination-table'

import ProfessionalEditor from '../components/professional-editor'
import { useProfessionalsPage } from '../hooks/use-professionals-page'
const ProfessionalsPage = () => {
  const {
    establishmentId,
    professionals,
    visibleProfessionals,
    filteredCount,
    pagination,
    handlePaginationChange,
    search,
    setSearch,
    isLoading,
    error,
    retryProfessionals,
    editor,
    openCreateProfessional,
    openUpdateProfessional,
    closeProfessionalEditor,
    scopeKey,
  } = useProfessionalsPage()
  return (
    <Box spaceY="4">
      <Header.Root justify="space-between">
        <Header.Title>Profissionais</Header.Title>
        <Button onClick={openCreateProfessional}>Cadastrar profissional</Button>
      </Header.Root>
      <HStack>
        <Input
          aria-label="Buscar profissional"
          placeholder="Buscar por nome ou especialidade"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Text whiteSpace="nowrap">{professionals.length} profissionais</Text>
      </HStack>
      {isLoading && <Text role="status">Carregando profissionais...</Text>}
      {error && (
        <Stack>
          <Text role="alert">{error.message}</Text>
          <Button onClick={retryProfessionals}>Tentar novamente</Button>
        </Stack>
      )}
      {!isLoading && !error && visibleProfessionals.length === 0 && (
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title>Nenhum profissional encontrado.</Alert.Title>
        </Alert.Root>
      )}
      {!error && visibleProfessionals.length > 0 && (
        <Card.Root overflowX="auto">
          <Table.Root>
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
                      onClick={() => openUpdateProfessional(professional.id)}
                    >
                      Detalhes e edição
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card.Root>
      )}
      <PaginationTable
        count={filteredCount}
        page={pagination.page}
        pageSize={pagination.page_size}
        onPageChange={handlePaginationChange}
      />
      {editor && (
        <ProfessionalEditor
          key={scopeKey + ':' + establishmentId}
          establishmentId={establishmentId}
          professionalId={editor.professionalId}
          onClose={closeProfessionalEditor}
        />
      )}
    </Box>
  )
}
export default ProfessionalsPage
