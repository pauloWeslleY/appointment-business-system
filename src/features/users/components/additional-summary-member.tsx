import { Badge, Card, DataList, For, Text } from '@chakra-ui/react'
import { useRouteContext } from '@tanstack/react-router'

import { mapLabelMemberAccessScope } from '@/features/members/types/member-access-scope.type'
import { mapLabelMemberRole } from '@/features/members/types/member-role.type'
import { mapLabelMemberStatus } from '@/features/members/types/member-status.type'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { cardSectionCss } from '@/theme/styles/global-styles'

const AdditionalSummaryMember = () => {
  const { memberContext } = useRouteContext({ from: '/_app/_authenticated' })
  const memberCurrentRole = mapLabelMemberRole(memberContext.role)
  const memberCurrentAccessScope = mapLabelMemberAccessScope(
    memberContext.member.profile.accessScope,
  )

  const memberCurrentStatus = mapLabelMemberStatus(
    memberContext.member.profile.status,
  )

  return (
    <Card.Root variant="outline" css={cardSectionCss} h="fit">
      <Text fontSize="lg" fontWeight="bold">
        Informações do membro
      </Text>

      <DataList.Root
        mt="4"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(min(400px, 100%), 1fr))"
        gap="4"
      >
        <For
          each={[
            {
              label: 'Papel',
              value: memberCurrentRole.label || 'N/A',
            },
            {
              label: 'Status',
              value: memberCurrentStatus.label,
            },
            {
              label: 'Tipo de acesso',
              value: memberCurrentAccessScope || 'N/A',
            },
            {
              label: 'Empresa',
              value: memberContext.organization.name || 'N/A',
            },
            {
              label: 'Data da criação',
              value: formattedDateAndHours(
                memberContext.member.profile.createdAt ?? null,
                true,
              ),
            },
            {
              label: 'Data da última atualização',
              value: formattedDateAndHours(
                memberContext.member.profile.updatedAt ?? null,
                true,
              ),
            },
          ]}
        >
          {(info) => (
            <DataList.Item key={info.label}>
              <DataList.ItemLabel>{info.label}</DataList.ItemLabel>
              <DataList.ItemValue>
                {info.label === 'Status' ? (
                  <Badge
                    colorPalette={memberCurrentStatus.color}
                    variant="surface"
                    size="sm"
                    rounded="lg"
                  >
                    {memberCurrentStatus.label}
                  </Badge>
                ) : (
                  info.value
                )}
              </DataList.ItemValue>
            </DataList.Item>
          )}
        </For>
      </DataList.Root>
    </Card.Root>
  )
}

export default AdditionalSummaryMember
