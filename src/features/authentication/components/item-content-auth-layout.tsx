import { Box, Flex, Icon, type IconProps, Text } from '@chakra-ui/react'
import { BuildingComplex, CalendarCheck, Users } from 'lucide-react'
import type { ElementType } from 'react'

interface ItemContentAuthLayoutProps {
  index: number
  item: {
    title: string
    description: string
  }
}

interface ItemContentIconProps {
  icon: ElementType
  bg: IconProps['bg']
  color: IconProps['color']
}

const iconsSummary: Record<string, ItemContentIconProps> = {
  '0': {
    icon: CalendarCheck,
    bg: { base: 'green.200', _dark: 'green.400/20' },
    color: { base: 'green.700', _dark: 'green.300' },
  },
  '1': {
    icon: Users,
    bg: { base: 'blue.200', _dark: 'blue.400/20' },
    color: { base: 'blue.700', _dark: 'blue.300' },
  },
  '2': {
    icon: BuildingComplex,
    bg: { base: 'purple.200', _dark: 'purple.400/20' },
    color: { base: 'purple.700', _dark: 'purple.300' },
  },
} as const

const ItemContentAuthLayout = ({ index, item }: ItemContentAuthLayoutProps) => {
  const icon = iconsSummary[index.toString()]

  return (
    <Flex
      h="20"
      w="full"
      align="center"
      gap="4"
      rounded="2xl"
      py="2"
      px="6"
      borderWidth="1px"
      borderColor={{ base: 'slate.500/20', _dark: 'slate.200/10' }}
      bg={{ base: 'whiteAlpha.300', _dark: 'blackAlpha.400' }}
    >
      <Flex
        align="center"
        justify="center"
        rounded="full"
        bg={icon.bg}
        boxSize="10"
        fontSize="sm"
        fontWeight="light"
        p="2"
      >
        {icon && <Icon as={icon.icon} color={icon.color} />}
      </Flex>

      <Box spaceY="1">
        <Text
          fontWeight="semibold"
          fontSize="md"
          lineHeight="short"
          color={{ base: 'slate.950', _dark: 'navy.800' }}
        >
          {item.title}
        </Text>
        <Text
          fontWeight="normal"
          fontSize="sm"
          lineHeight="short"
          letterSpacing="wider"
          color={{ base: 'blackAlpha.700', _dark: 'slate.300' }}
        >
          {item.description}
        </Text>
      </Box>
    </Flex>
  )
}

export default ItemContentAuthLayout
