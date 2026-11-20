import { For, Table, Text } from '@chakra-ui/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Fragment, useState } from 'react'

import { cssTableColumns, cssTableRows } from '@/theme/styles/global-styles'

import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'
import EstablishmentTableRow from './establishment-table-row'
import EstablishmentTableRowDetails from './establishment-table-row-details'

interface TableEstablishmentsProps {
  establishments: EstablishmentOrganizationProfileApiResponse[]
}

const establishmentTableColumns = [
  'Estabelecimento',
  'Contato',
  'Funcionamento',
  'Status',
  'Avaliação',
]

const TableEstablishments = ({ establishments }: TableEstablishmentsProps) => {
  const [expandedEstablishmentId, setExpandedEstablishmentId] = useState<
    string | null
  >(null)
  const shouldReduceDetailsMotion = useReducedMotion()

  const toggleEstablishmentDetails = (establishmentId: string) => {
    setExpandedEstablishmentId((currentEstablishmentId) =>
      currentEstablishmentId === establishmentId ? null : establishmentId,
    )
  }

  return (
    <Table.ScrollArea
      tabIndex={0}
      maxW="full"
      aria-label="Estabelecimentos: role para ver todas as colunas"
      rounded="lg"
    >
      <Table.Root variant="outline" minW="56rem">
        <Table.Header>
          <Table.Row {...cssTableRows}>
            <Table.ColumnHeader w="12" {...cssTableColumns}>
              <Text srOnly>Expandir detalhes</Text>
            </Table.ColumnHeader>

            <For each={establishmentTableColumns}>
              {(establishmentTableColumn) => (
                <Table.ColumnHeader
                  key={establishmentTableColumn}
                  textTransform="uppercase"
                  fontSize="xs"
                  {...cssTableColumns}
                >
                  {establishmentTableColumn}
                </Table.ColumnHeader>
              )}
            </For>

            <Table.ColumnHeader
              textAlign="right"
              textTransform="uppercase"
              fontSize="xs"
              {...cssTableColumns}
            >
              Ações
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <For each={establishments}>
            {(establishment) => {
              const isEstablishmentExpanded =
                expandedEstablishmentId === establishment.id
              const establishmentDetailsId = `establishment-details-${establishment.id}`

              return (
                <Fragment key={establishment.id}>
                  <EstablishmentTableRow
                    establishment={establishment}
                    establishmentDetailsId={establishmentDetailsId}
                    isEstablishmentExpanded={isEstablishmentExpanded}
                    onToggleEstablishmentDetails={toggleEstablishmentDetails}
                  />

                  <AnimatePresence initial={false}>
                    {isEstablishmentExpanded && (
                      <Table.Row id={establishmentDetailsId} {...cssTableRows}>
                        <Table.Cell
                          colSpan={establishmentTableColumns.length + 2}
                          p="0"
                        >
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: shouldReduceDetailsMotion ? 0 : 0.3,
                              ease: [0.4, 0, 0.2, 1] as const,
                            }}
                            style={{ overflow: 'hidden' }}
                          >
                            <EstablishmentTableRowDetails
                              establishment={establishment}
                            />
                          </motion.div>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </AnimatePresence>
                </Fragment>
              )
            }}
          </For>
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}

export default TableEstablishments
