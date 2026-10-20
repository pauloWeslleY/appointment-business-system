import { Card, DataList, HStack, Icon, Text } from '@chakra-ui/react'

import { cardSectionCss } from '@/theme/styles/global-styles'

interface SummaryOrganizationProfileProps {
  icon: React.ElementType
  title: string
  data: { label: string; value: string }[]
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
      <HStack>
        <Icon as={icon} color={{ _light: 'teal.700', _dark: 'teal.400' }} />
        <Text>{title}</Text>
      </HStack>

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
