import { Card, DataList, For, Icon, List, Text } from '@chakra-ui/react'
import { useRouteContext } from '@tanstack/react-router'
import { CheckCircle } from 'lucide-react'

import {
  mapLabelActions,
  mapLabelResource,
} from '@/shared/constants/permission'
import { listGroupedPermissions } from '@/shared/helpers/list-permissions'
import { cardSectionCss } from '@/theme/styles/global-styles'

const ProfileSummaryPermissions = () => {
  const { memberContext } = useRouteContext({ from: '/_app/_authenticated' })
  const permissionGrouped = listGroupedPermissions(memberContext.permissions)

  return (
    <Card.Root variant="outline" css={cardSectionCss} h="fit">
      <Text fontSize="lg" fontWeight="bold">
        Permissões atribuídas
      </Text>

      <DataList.Root
        mt="4"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(min(200px, 100%), 1fr))"
        gap="4"
      >
        <For each={permissionGrouped}>
          {(permission) => (
            <DataList.Item key={permission.resource}>
              <DataList.ItemLabel>
                {mapLabelResource[permission.resource]}
              </DataList.ItemLabel>
              <DataList.ItemValue>
                <List.Root gap="2" variant="plain" align="center">
                  <For each={mapLabelActions(permission.actions)}>
                    {(action) => (
                      <List.Item key={action} fontSize="sm">
                        <List.Indicator asChild color="green.500">
                          <Icon as={CheckCircle} boxSize="4" />
                        </List.Indicator>
                        {action}
                      </List.Item>
                    )}
                  </For>
                </List.Root>
              </DataList.ItemValue>
            </DataList.Item>
          )}
        </For>
      </DataList.Root>
    </Card.Root>
  )
}

export default ProfileSummaryPermissions
