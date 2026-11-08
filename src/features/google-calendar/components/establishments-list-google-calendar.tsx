import { Flex, For, Spinner, Table, Text, VStack } from '@chakra-ui/react'

import PaginationTable from '@/components/layout/pagination-table'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { cssTableColumns } from '@/theme/styles/global-styles'

import { useEstablishmentsListGoogleCalendar } from '../hooks/use-establishments-list-google-calendar'
import DialogConnectGoogleCalendar from './dialog-connect-google-calendar'
import DialogDisconnectGoogleCalendar from './dialog-disconnect-google-calendar'
import EstablishmentItemGoogleCalendar from './etablishment-item-google-calendar'

const EstablishmentsListGoogleCalendar = () => {
  const {
    isOpenDialogGoogleCalendar,
    listEstablishmentsGoogleCalendar,
    paginatedEstablishments,
    page,
    pageSize,
    isPendingPagination,
    handlePaginationChange,
    handleDialogGoogleCalendar,
    setIsOpenDialogGoogleCalendar,
  } = useEstablishmentsListGoogleCalendar()

  if (listEstablishmentsGoogleCalendar.length === 0) {
    return (
      <Text
        mt="4"
        textAlign="center"
        color={{ _light: 'gray.500', _dark: 'gray.600' }}
      >
        Nenhum estabelecimento encontrado.
      </Text>
    )
  }

  return (
    <>
      <Table.ScrollArea
        tabIndex={0}
        maxW="full"
        aria-label="Integrações de calendário: role para ver todas as colunas"
        rounded="lg"
        borderColor={{ _light: 'slate.200', _dark: 'slate.900/60' }}
      >
        <Table.Root variant="outline" minW="36rem">
          <Table.Header>
            <Table.Row bg={{ _light: 'slate.200', _dark: 'slate.900/60' }}>
              <For
                each={[
                  'Estabelecimento',
                  'Situação',
                  'Conexão',
                  'Convidar clientes',
                ]}
              >
                {(header) => (
                  <Table.ColumnHeader {...cssTableColumns}>
                    {header}
                  </Table.ColumnHeader>
                )}
              </For>
              <Table.ColumnHeader textAlign="right" {...cssTableColumns}>
                Ações
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body aria-busy={isPendingPagination}>
            {isPendingPagination && (
              <Table.Row>
                <Table.Cell colSpan={5}>
                  <VStack py="6" role="status" colorPalette={colorDefaultTheme}>
                    <Spinner color="colorPalette.600" />
                    <Text color="colorPalette.600">Carregando dados...</Text>
                  </VStack>
                </Table.Cell>
              </Table.Row>
            )}

            {!isPendingPagination &&
              paginatedEstablishments.map((establishment) => {
                return (
                  <EstablishmentItemGoogleCalendar
                    key={establishment.id}
                    establishment={establishment}
                    onDialogGoogleCalendar={() =>
                      handleDialogGoogleCalendar(establishment.id)
                    }
                  />
                )
              })}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <Flex
        mt="4"
        gap="3"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="sm" color="fg.muted">
          Exibindo {paginatedEstablishments.length} de{' '}
          {listEstablishmentsGoogleCalendar.length} estabelecimentos
        </Text>

        {listEstablishmentsGoogleCalendar.length > pageSize && (
          <PaginationTable
            count={listEstablishmentsGoogleCalendar.length}
            page={page}
            pageSize={pageSize}
            onPageChange={handlePaginationChange}
          />
        )}
      </Flex>

      <DialogConnectGoogleCalendar
        isOpen={isOpenDialogGoogleCalendar}
        onOpen={setIsOpenDialogGoogleCalendar}
      />

      <DialogDisconnectGoogleCalendar
        isOpen={isOpenDialogGoogleCalendar}
        onOpen={setIsOpenDialogGoogleCalendar}
      />
    </>
  )
}

export default EstablishmentsListGoogleCalendar
