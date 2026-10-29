import { Card, DataList, For, Heading } from '@chakra-ui/react'

import { cardSectionCss } from '@/theme/styles/global-styles'

import type { ListMemberApiResponse } from '../types/list-member.api.type'
import { mapLabelMemberRole } from '../types/member-role.type'

interface CardMemberSummaryProps {
  member?: ListMemberApiResponse['members'][number]
}

const cardItemList = (label: string, value: string) => ({ label, value })

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
            cardItemList('Nome', member?.user.name ?? '--'),
            cardItemList('Email', member?.user.email ?? '--'),
            cardItemList('Papel', roleMember.label),
            cardItemList(
              'Criado Em',
              member?.createdAt.toLocaleDateString() ?? '--',
            ),
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
