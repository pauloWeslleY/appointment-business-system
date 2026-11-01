import { Card, SimpleGrid, Stack, Text } from '@chakra-ui/react'

import AdditionalInformationUser from '@/features/users/components/additional-information-user'
import CarduserProfile from '@/features/users/pages/card-user-profile'
import FormProfileUser from '@/features/users/pages/form-profile-user'
import { cardSectionCss } from '@/theme/styles/global-styles'

const Profile = () => {
  return (
    <SimpleGrid gap="2" columns={{ base: 1, lg: 3 }}>
      <Card.Root variant="outline" css={cardSectionCss} h="fit">
        <CarduserProfile />
      </Card.Root>

      <Stack gap="2" gridColumn={{ base: '1 / -1', lg: 'span 2' }}>
        <Card.Root variant="outline" css={cardSectionCss} h="fit">
          <Text fontSize="lg" fontWeight="bold" mb="4">
            Editar perfil
          </Text>

          <FormProfileUser />
        </Card.Root>

        <AdditionalInformationUser />
      </Stack>
    </SimpleGrid>
  )
}

export default Profile
