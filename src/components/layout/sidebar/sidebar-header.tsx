import { Flex, HStack, Separator } from '@chakra-ui/react'
import { type PropsWithChildren, type ReactElement } from 'react'

import { ColorModeButton } from '@/components/ui/color-mode'

import MenuProfile from '../menu-profile'
import MenuSettings from '../menu-settings'
import SidebarMobile, { type SidebarMobileProps } from './sidebar-mobile'

interface SidebarHeaderProps {
  navigation?: SidebarMobileProps
  select?: ReactElement
}

const SidebarHeader = ({
  children,
  navigation,
  select,
}: PropsWithChildren<SidebarHeaderProps>) => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={{ base: '2', lg: '4' }}
      w="full"
      minH="20"
      py="3"
      gap="2"
      flexWrap="wrap"
    >
      <HStack minW="0" flex="1" pl={{ base: '0', lg: '4' }}>
        {navigation && <SidebarMobile {...navigation} />}
        {children}
      </HStack>

      <Flex align="center" flexShrink="0" gap={{ base: '1', md: '4' }}>
        {select && (
          <>
            {select}

            <Separator
              h="8"
              orientation="vertical"
              borderColor={{ _light: 'gray.200', _dark: 'gray.500' }}
            />
          </>
        )}

        <ColorModeButton rounded="full" variant="ghost" size="sm" />
        <MenuSettings />
        <MenuProfile />
      </Flex>
    </Flex>
  )
}

export default SidebarHeader
