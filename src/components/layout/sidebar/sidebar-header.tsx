import { Avatar, Flex, HStack, Icon, IconButton, Text } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'
import { FiMenu } from 'react-icons/fi'

import { ColorModeButton } from '@/components/ui/color-mode'
import { authClient } from '@/lib/auth'
import { useStorageImage } from '@/shared/hooks/use-get-storage-image'

const SidebarHeader = ({ children }: PropsWithChildren) => {
  const { data } = authClient.useSession()
  const { data: storageData } = useStorageImage(data?.user?.image)

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="full"
      px="4"
      borderBottomWidth="1px"
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
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

        <Flex
          align="center"
          gap="2"
          p="1"
          rounded="full"
          borderWidth="1px"
          borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
        >
          <Avatar.Root
            shape="full"
            size="2xs"
            borderWidth="1px"
            borderColor="colorPalette.500"
            bg={{ base: 'colorPalette.100', _dark: 'colorPalette.700/40' }}
            color={{ base: 'colorPalette.400', _dark: 'colorPalette.500' }}
          >
            <Avatar.Fallback />
            <Avatar.Image src={storageData ?? ''} />
          </Avatar.Root>

          <Text
            lineHeight="1"
            fontWeight="light"
            color={{ base: 'primary.500', _dark: 'primary.300' }}
            textTransform="capitalize"
          >
            {data?.user?.name ?? 'Usuário'}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SidebarHeader
