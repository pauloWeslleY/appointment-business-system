import { Avatar, HStack, Skeleton, Stack, Text } from '@chakra-ui/react'

import { authClient } from '@/lib/auth'
import { useStorageImage } from '@/shared/hooks/use-get-storage-image'
import { useMenuCollapse } from '@/shared/store/menu-collapse'

const CardUserInfo = () => {
  const { collapsed } = useMenuCollapse()
  const { data } = authClient.useSession()
  const { data: storageData, isLoading } = useStorageImage(data?.user?.image)

  if (isLoading) {
    return (
      <Stack gap="2" w="full">
        <Skeleton height="20px" rounded="xl" />
        <Skeleton height="20px" rounded="xl" />
        <Skeleton height="20px" rounded="xl" />
      </Stack>
    )
  }

  return (
    <HStack w="full" justify={collapsed ? 'center' : 'flex-start'} gap="2">
      <Avatar.Root
        shape="full"
        size="sm"
        borderWidth="1px"
        borderColor="colorPalette.500"
        bg={{ base: 'colorPalette.100', _dark: 'colorPalette.700/40' }}
        color={{ base: 'colorPalette.400', _dark: 'colorPalette.500' }}
      >
        <Avatar.Fallback />
        <Avatar.Image src={storageData ?? ''} />
      </Avatar.Root>

      {!collapsed && (
        <div>
          <Text
            lineHeight="1"
            fontWeight="medium"
            color={{ base: 'primary.500', _dark: 'primary.300' }}
          >
            {data?.user?.name ?? 'Usuário'}
          </Text>
          <Text
            fontSize="xs"
            color={{ base: 'gray.400', _dark: 'gray.600' }}
            truncate
          >
            {data?.user?.email ?? 'email@example.com'}
          </Text>
        </div>
      )}
    </HStack>
  )
}

export default CardUserInfo
