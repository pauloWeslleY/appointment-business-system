import { Flex, HStack } from '@chakra-ui/react'
import { type PropsWithChildren } from 'react'

import { ColorModeButton } from '@/components/ui/color-mode'

import MenuProfile from '../menu-profile'
import MenuSettings from '../menu-settings'
import SidebarMobile from './sidebar-mobile'

const SidebarHeader = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={{ base: '2', lg: '4' }}
      w="full"
      h="20"
    >
      <HStack pl={{ base: '0', md: '4' }}>
        <SidebarMobile />

        {children}
      </HStack>

      <Flex align="center" gap={{ base: '2', md: '4' }}>
        <ColorModeButton rounded="full" variant="ghost" size="sm" />

        <MenuSettings />
        <MenuProfile />
      </Flex>
    </Flex>
  )
}

export default SidebarHeader
