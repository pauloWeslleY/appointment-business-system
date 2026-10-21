import { Card, Flex, Icon, Text } from '@chakra-ui/react'

import { cardSectionCss } from '@/theme/styles/global-styles'

interface CardStatMemberProps {
  stat: {
    icon: React.ElementType
    title: string
    value: string | number
  }
}

const CardStatMember = ({
  stat: { icon: SomeIcon, title, value },
}: CardStatMemberProps) => {
  return (
    <Card.Root
      css={cardSectionCss}
      variant="outline"
      display="flex"
      flexDir="column"
      gap="3"
    >
      <Icon as={SomeIcon} color={{ _light: 'teal.700', _dark: 'teal.400' }} />
      <Flex align="center" gap="2">
        <Text
          fontSize="md"
          fontWeight="bold"
          letterSpacing="wide"
          color={{ _light: 'slate.500', _dark: 'slate.300' }}
        >
          {value}
        </Text>
        <Text fontSize="xs">{title}</Text>
      </Flex>
    </Card.Root>
  )
}

export default CardStatMember
