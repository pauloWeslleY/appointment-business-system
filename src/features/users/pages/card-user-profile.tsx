import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react'
import { useRouteContext } from '@tanstack/react-router'

import { mapLabelMemberRole } from '@/features/members/types/member-role.type'
import { authClient } from '@/lib/auth'
import { useStorageImage } from '@/shared/hooks/use-get-storage-image'

const CarduserProfile = () => {
  const { data } = authClient.useSession()
  const { data: storageData } = useStorageImage(data?.user?.image)
  const { memberContext } = useRouteContext({ from: '/_authenticated' })
  const { label: memberRole } = mapLabelMemberRole(memberContext.role)

  return (
    <Flex flexDir="column" align="center" justify="center">
      <Avatar.Root
        shape="full"
        boxSize="28"
        borderWidth="1px"
        borderColor="colorPalette.500"
        bg={{ base: 'colorPalette.100', _dark: 'colorPalette.700/40' }}
        color={{ base: 'colorPalette.400', _dark: 'colorPalette.500' }}
      >
        <Avatar.Fallback />
        {storageData && <Avatar.Image src={storageData} />}
      </Avatar.Root>

      <Box mt="6" textAlign="center">
        <Text>{memberContext.user.name}</Text>
        <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }}>
          {memberContext.user.email}
        </Text>
        <Badge
          size="sm"
          variant="surface"
          rounded="lg"
          letterSpacing="wider"
          color="AccentColor"
        >
          {memberRole}
        </Badge>
      </Box>
    </Flex>
  )
}

export default CarduserProfile
