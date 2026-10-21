import { Card, DataList, Icon } from '@chakra-ui/react'
import type { ElementType } from 'react'

import { cardSectionCss } from '@/theme/styles/global-styles'

interface SummaryOrganizationProfileProps {
  icon: ElementType
  title: string
  data: {
    label: string
    value: string
  }[]
}

const SummaryOrganizationProfile = ({
  title,
  icon,
  data,
}: SummaryOrganizationProfileProps) => {
  return (
    <Card.Root
      css={cardSectionCss}
      variant="outline"
      display="flex"
      flexDir="column"
      gap="4"
    >
      <Card.Title
        display="flex"
        alignItems="center"
        gap="2"
        color={{ _light: 'sea.600', _dark: 'sea.100' }}
      >
        <Icon as={icon} color={{ _light: 'teal.700', _dark: 'teal.400' }} />
        {title}
      </Card.Title>

      <DataList.Root orientation="vertical">
        {data.map(({ label, value }) => (
          <DataList.Item key={label}>
            <DataList.ItemLabel>{label}</DataList.ItemLabel>
            <DataList.ItemValue>{value}</DataList.ItemValue>
          </DataList.Item>
        ))}
      </DataList.Root>
    </Card.Root>
  )
}

export default SummaryOrganizationProfile
