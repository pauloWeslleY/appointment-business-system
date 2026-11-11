import {
  Badge,
  Box,
  Card,
  Flex,
  For,
  Icon,
  Tabs,
  Text,
  useTabs,
} from '@chakra-ui/react'
import { useRouteContext } from '@tanstack/react-router'
import { ShieldCheckIcon } from 'lucide-react'
import type { ReactElement } from 'react'

import { mapLabelMemberRole } from '@/features/members/types/member-role.type'
import {
  TABS_PERMISSIONS,
  type TabsPermissionsType,
} from '@/features/users/constants/menu-permissions'
import { listGroupedPermissions } from '@/shared/helpers/list-permissions'
import { cardSectionCss } from '@/theme/styles/global-styles'

import TablePermission from './table-permission'

function isPermissionTab(value: string | null): value is TabsPermissionsType {
  return Object.values(TABS_PERMISSIONS).some((tab) => tab === value)
}

const ProfileSummaryPermissions = () => {
  const { memberContext } = useRouteContext({ from: '/_app/_authenticated' })
  const tabsPermissions = useTabs({ defaultValue: TABS_PERMISSIONS.OPERATION })
  const permissionGrouped = listGroupedPermissions(memberContext.permissions)
  const memberRole = mapLabelMemberRole(memberContext.role)
  const selectedTab = isPermissionTab(tabsPermissions.value)
    ? tabsPermissions.value
    : TABS_PERMISSIONS.OPERATION

  const Table = (
    <TablePermission permissions={permissionGrouped} tabs={selectedTab} />
  )

  const tabsContentPermissions: Record<string, ReactElement> = {
    [TABS_PERMISSIONS.OPERATION]: (
      <Tabs.Content value={TABS_PERMISSIONS.OPERATION}>{Table}</Tabs.Content>
    ),
    [TABS_PERMISSIONS.TEAM]: (
      <Tabs.Content value={TABS_PERMISSIONS.TEAM}>{Table}</Tabs.Content>
    ),
    [TABS_PERMISSIONS.COMPANY]: (
      <Tabs.Content value={TABS_PERMISSIONS.COMPANY}>{Table}</Tabs.Content>
    ),
    [TABS_PERMISSIONS.FINANCE]: (
      <Tabs.Content value={TABS_PERMISSIONS.FINANCE}>{Table}</Tabs.Content>
    ),
  }

  return (
    <Card.Root variant="outline" css={cardSectionCss} h="fit" spaceY="4">
      <Flex align="center" justify="space-between">
        <div>
          <Text fontSize="lg" fontWeight="bold">
            Minhas Permissões
          </Text>
          <Text fontSize="sm" color="gray.500">
            Aqui estão as permissões atribuídas ao seu perfil.
          </Text>
        </div>

        <Badge
          size="sm"
          variant="surface"
          rounded="md"
          colorPalette={memberRole.color}
        >
          {memberRole.label}
        </Badge>
      </Flex>

      <Box
        p="2"
        rounded="lg"
        bg={{ _light: 'slate.100/50', _dark: 'slate.800/40' }}
      >
        <Flex gap="4" align="center">
          <Flex
            align="center"
            justify="center"
            p="2"
            rounded="xl"
            bg={{ _light: 'navy.100/50', _dark: 'navy.900/50' }}
          >
            <Icon as={ShieldCheckIcon} boxSize="6" color="sea.500" />
          </Flex>

          <div>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={{ _light: 'slate.500', _dark: 'slate.300' }}
            >
              {memberContext.organization.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Permissões da organização ativa
            </Text>
          </div>
        </Flex>
      </Box>

      <Text fontSize="md">Permissões por módulo</Text>

      <Tabs.RootProvider value={tabsPermissions}>
        <Tabs.List>
          <For
            each={[
              { value: TABS_PERMISSIONS.OPERATION, label: 'Operação' },
              { value: TABS_PERMISSIONS.TEAM, label: 'Equipe' },
              { value: TABS_PERMISSIONS.COMPANY, label: 'Empresa' },
              { value: TABS_PERMISSIONS.FINANCE, label: 'Financeiro' },
            ]}
          >
            {(item) => (
              <Tabs.Trigger key={item.value} value={item.value}>
                {item.label}
              </Tabs.Trigger>
            )}
          </For>
        </Tabs.List>

        {
          tabsContentPermissions[
            tabsPermissions.value || TABS_PERMISSIONS.OPERATION
          ]
        }
      </Tabs.RootProvider>
    </Card.Root>
  )
}

export default ProfileSummaryPermissions
