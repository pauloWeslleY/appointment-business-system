import { Card, DataList, For, Heading } from '@chakra-ui/react'

import { cardSectionCss } from '@/theme/styles/global-styles'

import type { ListMemberApiResponse } from '../types/list-member.api.type'
import { mapLabelMemberRole } from '../types/member-role.type'

interface CardMemberSummaryProps {
  member?: ListMemberApiResponse['members'][number]
}

const CardMemberSummary = ({ member }: CardMemberSummaryProps) => {
  const roleMember = mapLabelMemberRole(member?.role)

  return (
    <Card.Root {...cardSectionCss} shadow="none" p="2">
      <Heading size="md" mb="2">
        Informações
      </Heading>

      <DataList.Root orientation="horizontal">
        <For
          each={[
            {
              label: 'Nome',
              value: member?.user.name ?? '--',
            },
            {
              label: 'Email',
              value: member?.user.email ?? '--',
            },
            {
              label: 'Papel',
              value: roleMember.label,
            },
            {
              label: 'Criado Em',
              value: member?.createdAt.toLocaleDateString() ?? '--',
            },
          ]}
        >
          {(item) => (
            <DataList.Item key={item.label}>
              <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
              <DataList.ItemValue>{item.value}</DataList.ItemValue>
            </DataList.Item>
          )}
        </For>
      </DataList.Root>
    </Card.Root>
  )
}

export default CardMemberSummary
