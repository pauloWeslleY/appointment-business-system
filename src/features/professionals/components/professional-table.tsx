import { For, Icon, IconButton, Table } from '@chakra-ui/react'
import { UserRoundCog } from 'lucide-react'

import { Tooltip } from '@/components/ui/tooltip'
import { tableColumnsCss, tableRowsCss } from '@/theme/styles/global-styles'

import type { ProfessionalListItemApiResponse } from '../types/professional-api.type'

interface ProfessionalTableProps {
  professionals: ProfessionalListItemApiResponse[]
  onEdit: (professionalId: string) => void
}

export default function ProfessionalTable({
  professionals,
  onEdit,
}: ProfessionalTableProps) {
  return (
    <Table.ScrollArea
      tabIndex={0}
      maxW="full"
      aria-label="Profissionais: role para ver todas as colunas"
      rounded="lg"
    >
      <Table.Root variant="outline" minW="36rem">
        <Table.Header>
          <Table.Row {...tableRowsCss}>
            <For each={['Nome', 'Especialidade', 'Sobre']}>
              {(column) => (
                <Table.ColumnHeader key={column} {...tableColumnsCss}>
                  {column}
                </Table.ColumnHeader>
              )}
            </For>
            <Table.ColumnHeader textAlign="right" {...tableColumnsCss}>
              Ações
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {professionals.map((professional) => (
            <Table.Row key={professional.id} {...tableRowsCss}>
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
                    onClick={() => onEdit(professional.id)}
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
  )
}
