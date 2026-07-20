import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

import { authClient } from '@/lib/auth'
import { useStorageImage } from '@/shared/hooks/use-get-storage-image'

const CarduserProfile = () => {
  const { data } = authClient.useSession()
  const { data: storageData } = useStorageImage(data?.user?.image)

  return (
    <Flex flexDir="column" align="center" justify="center" p="4">
      <Avatar.Root
        shape="full"
        boxSize="28"
        borderWidth="1px"
        borderColor="colorPalette.500"
        bg={{ base: 'colorPalette.100', _dark: 'colorPalette.700/40' }}
        color={{ base: 'colorPalette.400', _dark: 'colorPalette.500' }}
      >
        <Avatar.Fallback />
        <Avatar.Image src={storageData ?? ''} />
      </Avatar.Root>

      <Box mt="6" textAlign="center">
        <Text>{data?.user?.name ?? 'Usuário'}</Text>
        <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }}>
          {data?.user?.email ?? ''}
        </Text>
      </Box>
    </Flex>
  )
}

export default CarduserProfile
