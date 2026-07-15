import { Flex, HStack, Icon, IconButton } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'
import { FiMenu } from 'react-icons/fi'

import { ColorModeButton } from '@/components/ui/color-mode'

const SidebarHeader = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="full"
      px="4"
      borderBottomWidth="1px"
      borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
      h="14"
    >
      <HStack pl={{ base: '0', md: '4' }}>
        <IconButton
          aria-label="Menu"
          display={{ base: 'inline-flex', md: 'none' }}
          size="sm"
        >
          <Icon as={FiMenu} />
        </IconButton>

        {children}
      </HStack>

      <Flex align="center" gap="4">
        <ColorModeButton rounded="full" variant="ghost" size="sm" />
      </Flex>
    </Flex>
  )
}

export default SidebarHeader
