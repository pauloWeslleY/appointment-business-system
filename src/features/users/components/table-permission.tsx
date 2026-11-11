import { For, Icon, Table } from '@chakra-ui/react'
import { CheckCircleIcon, MinusIcon } from 'lucide-react'

import {
  PermissionByModule,
  type TabsPermissionsType,
} from '@/features/users/constants/menu-permissions'
import {
  mapLabelActions,
  mapLabelResource,
} from '@/shared/constants/permission'
import type { GroupedPermissions } from '@/shared/types/permissions.type'
import { cssTableRows } from '@/theme/styles/global-styles'

interface TablePermissionProps {
  tabs: TabsPermissionsType
  permissions: GroupedPermissions[]
}

const IconTablePermission = ({
  actions,
  action,
}: {
  actions: string[]
  action: string
}) => {
  const hasPermission = actions.includes(action)
  return hasPermission ? (
    <Icon as={CheckCircleIcon} boxSize="4" color="green.500" />
  ) : (
    <Icon as={MinusIcon} boxSize="4" />
  )
}

const TablePermission = ({ tabs, permissions }: TablePermissionProps) => {
  const filteredCurrentTabs = (permission: GroupedPermissions) => {
    return PermissionByModule[tabs].includes(
      mapLabelResource[permission.resource],
    )
  }

  const filteredPermissions = permissions
    .filter(filteredCurrentTabs)
    .map((permission) => ({
      ...permission,
      resourceLabel: mapLabelResource[permission.resource],
    }))

  const otherPermissions = (actions: string[]) => {
    const otherActions = actions.filter(
      (action) => !['create', 'read', 'update', 'delete'].includes(action),
    )

    return mapLabelActions(otherActions).join(', ')
  }

  return (
    <Table.ScrollArea tabIndex={0} maxW="full" rounded="lg">
      <Table.Root variant="outline" minW="36rem">
        <Table.Header>
          <Table.Row {...cssTableRows}>
            <Table.ColumnHeader textAlign="left">Recurso</Table.ColumnHeader>

            <For each={['Criar', 'Ler', 'Editar', 'Excluir']}>
              {(header) => <Table.ColumnHeader>{header}</Table.ColumnHeader>}
            </For>

            <Table.ColumnHeader>Outras ações</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For each={filteredPermissions}>
            {(permission) => (
              <Table.Row key={permission.resource} {...cssTableRows}>
                <Table.Cell>{permission.resourceLabel}</Table.Cell>
                <Table.Cell>
                  <IconTablePermission
                    actions={permission.actions}
                    action="create"
                  />
                </Table.Cell>
                <Table.Cell>
                  <IconTablePermission
                    actions={permission.actions}
                    action="read"
                  />
                </Table.Cell>
                <Table.Cell>
                  <IconTablePermission
                    actions={permission.actions}
                    action="update"
                  />
                </Table.Cell>
                <Table.Cell>
                  <IconTablePermission
                    actions={permission.actions}
                    action="delete"
                  />
                </Table.Cell>
                <Table.Cell>
                  {otherPermissions(permission.actions) || 'N/A'}
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}

export default TablePermission
