import { Flex, Text } from '@chakra-ui/react'

interface ItemContentAuthLayoutProps {
  id: number
  index: number
  title: string
}

const ItemContentAuthLayout = ({
  id,
  index,
  title,
}: ItemContentAuthLayoutProps) => {
  const isEven = index % 2 === 0

  return (
    <Flex
      h="20"
      w="full"
      align="center"
      gap="2"
      rounded="2xl"
      p="2"
      bg={{
        base: isEven ? 'whiteAlpha.300' : 'colorPalette.300',
        _dark: isEven ? 'blackAlpha.300' : 'colorPalette.700',
      }}
      borderWidth={isEven ? '1px' : '0px'}
      borderColor={{
        base: isEven ? 'colorPalette.500/20' : 'transparent',
        _dark: isEven ? 'colorPalette.200/10' : 'transparent',
      }}
    >
      <Flex
        align="center"
        justify="center"
        rounded="full"
        bg={{
          base: isEven ? 'colorPalette.100/60' : 'colorPalette.200/40',
          _dark: isEven ? 'colorPalette.500/20' : 'colorPalette.200/20',
        }}
        boxSize="8"
        fontSize="sm"
        fontWeight="light"
      >
        {id}
      </Flex>

      <Text
        fontWeight={{ base: 'light', _dark: 'lighter' }}
        fontSize="md"
        lineHeight="short"
        letterSpacing="wider"
        color={{ base: 'blackAlpha.950', _dark: 'gray.100' }}
      >
        {title}
      </Text>
    </Flex>
  )
}

export default ItemContentAuthLayout
