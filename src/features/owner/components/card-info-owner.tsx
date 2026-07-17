import { Box, Card, For, HStack, Icon, Image, Text } from '@chakra-ui/react'
import { IdCard, Mail, PhoneCall } from 'lucide-react'

import { authClient } from '@/lib/auth'
import { FormatMask, formatterMask } from '@/shared/utils/formatted-mask'

import type { OwnerModel } from '../types/owner.model'

interface CardInfoOwnerProps {
  owner?: OwnerModel
}

const loadOwnerInfo = (owner?: OwnerModel) => [
  {
    icon: IdCard,
    value: formatterMask(owner?.cnpj || '', FormatMask.COMPANY_TAX_ID),
  },
  {
    icon: PhoneCall,
    value: formatterMask(owner?.phone || '', FormatMask.CELLPHONE),
  },
  {
    icon: Mail,
    value: owner?.email,
  },
]

const CardInfoOwner = ({ owner }: CardInfoOwnerProps) => {
  const { data: session } = authClient.useSession()
  const loadedOwnerInfo = loadOwnerInfo(owner)

  return (
    <Card.Root
      variant="outline"
      rounded="xl"
      bg={{ base: 'white', _dark: 'gray.950/40' }}
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg={{ base: 'white', _dark: 'gray.800' }}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        height="100%"
        width="100%"
        roundedTopLeft="lg"
        roundedTopRight="lg"
        p={8}
        display="flex"
        alignItems="left"
      >
        <Image
          src={session?.user?.image || '/user.png'}
          alt="Profile Picture"
          rounded="full"
          boxSize="150px"
          shadow="lg"
          border="5px solid"
          mb={-20}
          borderColor={{ base: 'gray.800', _dark: 'gray.200' }}
          bg="gray.200"
        />
      </Box>
      <Box spaceY="2" p={8} width="full" height="full" textAlign="left" mt={10}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color={{ base: 'colorPalette.800', _dark: 'colorPalette.200' }}
        >
          {owner?.name}
        </Text>

        <For each={loadedOwnerInfo}>
          {(item, index) => (
            <HStack
              key={index}
              gap={3}
              color={{ base: 'gray.800', _dark: 'gray.200' }}
            >
              <Icon as={item.icon} boxSize="6" />
              <Text
                fontSize="lg"
                color={{ base: 'gray.800', _dark: 'gray.200' }}
              >
                {item.value}
              </Text>
            </HStack>
          )}
        </For>
      </Box>
    </Card.Root>
  )
}

export default CardInfoOwner
