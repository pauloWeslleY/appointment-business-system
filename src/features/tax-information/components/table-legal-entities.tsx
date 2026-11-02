import {
  Alert,
  Badge,
  Box,
  ButtonGroup,
  For,
  Icon,
  IconButton,
  Menu,
  Portal,
  Skeleton,
  Stack,
  Table,
} from '@chakra-ui/react'
import { EllipsisVertical, Eye, Pencil } from 'lucide-react'

import {
  contentCss,
  cssTableColumns,
  menuItemCss,
} from '@/theme/styles/global-styles'

import { useTableLegalEntities } from '../hooks/use-table-legal-entities'
import { mapStatusLegalEntity } from '../types/tax-information-status.type'
import DialogDocumentTaxInformation from './dialog-document-tax-information'
import DialogFormUpdateTaxInformation from './dialog-update-tax-information'

const LegalEntitiesTable = () => {
  const {
    anchorElement,
    listLegalEntities,
    legalEntitiesTable,
    isLoadingListLegalEntities,
    isOpenDialogTaxInformation,
    isOpenDialogUpdateTaxInformation,
    errorListLegalEntities,
    menuOpenTableActionsLegalEntities,
    setIsOpenDialogTaxInformation,
    setIsOpenDialogUpdateTaxInformation,
    handleMenuTableActionsLegalEntities,
    handleMenuOpenTableActionsLegalEntities,
  } = useTableLegalEntities()

  if (isLoadingListLegalEntities) {
    return (
      <Stack gap="2" mt="4">
        <Skeleton h="20px" w="full" rounded="l3" />
        <Skeleton h="20px" w="full" rounded="l3" />
        <Skeleton h="20px" w="full" rounded="l3" />
      </Stack>
    )
  }

  if (errorListLegalEntities) {
    return (
      <Alert.Root status="error" variant="subtle" rounded="lg" mt="4">
        <Alert.Indicator />
        <Alert.Title>
          {errorListLegalEntities.message ||
            'Ocorreu um erro ao carregar a lista de entidades legais.'}
        </Alert.Title>
      </Alert.Root>
    )
  }

  return (
    <Box mt="4">
      {legalEntitiesTable.length === 0 ? (
        <Alert.Root status="info" variant="subtle" rounded="lg">
          <Alert.Indicator />
          <Alert.Title>Nenhum cadastro fiscal encontrado.</Alert.Title>
        </Alert.Root>
      ) : (
        <Table.ScrollArea
          rounded="lg"
          borderColor={{ _light: 'slate.200', _dark: 'slate.900/60' }}
        >
          <Table.Root variant="outline">
            <Table.Header>
              <Table.Row bg={{ _light: 'slate.200', _dark: 'slate.900/60' }}>
                <For
                  each={[
                    'Razão Social',
                    'Nome Fantasia',
                    'Documento',
                    'Situação',
                  ]}
                >
                  {(column) => (
                    <Table.ColumnHeader {...cssTableColumns}>
                      {column}
                    </Table.ColumnHeader>
                  )}
                </For>
                <Table.ColumnHeader textAlign="right" {...cssTableColumns}>
                  Ações
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {listLegalEntities?.legalEntities.map((taxInformation) => {
                const statusLegalEntity = mapStatusLegalEntity(
                  taxInformation.status,
                )
                return (
                  <Table.Row
                    key={taxInformation.id}
                    bg={{ _light: 'slate.50', _dark: 'slate.950/60' }}
                  >
                    <Table.Cell>{taxInformation.legalName}</Table.Cell>
                    <Table.Cell>{taxInformation.tradeName}</Table.Cell>
                    <Table.Cell>{taxInformation.maskedTaxId}</Table.Cell>

                    <Table.Cell>
                      <Badge
                        size="sm"
                        rounded="md"
                        variant="surface"
                        colorPalette={statusLegalEntity.color}
                        textTransform="uppercase"
                      >
                        {statusLegalEntity.label}
                      </Badge>
                    </Table.Cell>

                    <Table.Cell textAlign="right">
                      <ButtonGroup>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          rounded="lg"
                          onClick={(event) =>
                            handleMenuOpenTableActionsLegalEntities(
                              event,
                              taxInformation.id,
                            )
                          }
                        >
                          <Icon as={EllipsisVertical} />
                        </IconButton>
                      </ButtonGroup>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      )}

      <Menu.Root
        open={menuOpenTableActionsLegalEntities}
        onOpenChange={(e) => handleMenuTableActionsLegalEntities(e.open)}
        positioning={{
          placement: 'bottom-end',
          getAnchorElement: () => anchorElement,
        }}
      >
        <Portal>
          <Menu.Positioner>
            <Menu.Content {...contentCss}>
              <For
                each={[
                  {
                    value: 'update',
                    label: 'Editar',
                    icon: Pencil,
                    onClick: () => setIsOpenDialogUpdateTaxInformation(true),
                  },
                  {
                    value: 'view',
                    label: 'Ver detalhes',
                    icon: Eye,
                    onClick: () => setIsOpenDialogTaxInformation(true),
                  },
                ]}
              >
                {(item) => (
                  <Menu.Item
                    {...menuItemCss}
                    value={item.value}
                    onClick={item.onClick}
                  >
                    <Icon as={item.icon} boxSize="4" />
                    <Box flex="1">{item.label}</Box>
                  </Menu.Item>
                )}
              </For>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <DialogFormUpdateTaxInformation
        open={isOpenDialogUpdateTaxInformation}
        onOpen={setIsOpenDialogUpdateTaxInformation}
      />

      <DialogDocumentTaxInformation
        open={isOpenDialogTaxInformation}
        onOpen={setIsOpenDialogTaxInformation}
      />
    </Box>
  )
}

export default LegalEntitiesTable
