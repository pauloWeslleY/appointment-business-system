import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react'
import { useRouteContext } from '@tanstack/react-router'

import { mapLabelMemberRole } from '@/features/members/types/member-role.type'
import { useAccountImage } from '@/shared/hooks/use-account-image'

const CarduserProfile = () => {
  const userImage = useAccountImage()
  const { memberContext } = useRouteContext({ from: '/_app/_authenticated' })
  const { label: memberRole } = mapLabelMemberRole(memberContext.role)

  return (
    <Flex flexDir="column" align="center" justify="center">
      <Avatar.Root
        shape="full"
        boxSize="28"
        borderWidth="1px"
        borderColor="colorPalette.500"
        bg={{ _light: 'colorPalette.100', _dark: 'colorPalette.700/40' }}
        color={{ _light: 'colorPalette.400', _dark: 'colorPalette.500' }}
      >
        {userImage && <Avatar.Image src={userImage} />}
        <Avatar.Fallback />
      </Avatar.Root>

      <Box mt="6" textAlign="center">
        <Text>{memberContext.user.name}</Text>
        <Text fontSize="sm" color={{ _light: 'gray.500', _dark: 'gray.400' }}>
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
