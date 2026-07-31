import {
  Box,
  Card,
  For,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import { ItemDetails } from '@/components/item-details'
import { authClient } from '@/lib/auth'
import { useStorageImage } from '@/shared/hooks/use-get-storage-image'
import { FormatMask, formatterMask } from '@/shared/utils/formatted-mask'

import type { OwnerDetailsModel } from '../types/owner-details.model'

interface CardInfoOwnerProps {
  owner?: OwnerDetailsModel
}

const loadOwnerInfo = (owner?: OwnerDetailsModel) => [
  {
    label: 'CPF/CNPJ',
    value: formatterMask(owner?.cnpj || '', FormatMask.COMPANY_TAX_ID),
  },
  {
    label: 'Telefone',
    value: formatterMask(owner?.phone || '', FormatMask.CELLPHONE),
  },
  {
    label: 'E-mail',
    value: owner?.email,
  },
  {
    label: 'Estabelecimentos',
    value: owner?.totalEstablishments || 0,
  },
]

const CardInfoOwner = ({ owner }: CardInfoOwnerProps) => {
  const { data: session } = authClient.useSession()
  const { data: storageData } = useStorageImage(session?.user?.image)
  const loadedOwnerInfo = loadOwnerInfo(owner)

  return (
    <Card.Root
      gridColumn={{ base: '1', md: 'span 2' }}
      variant="outline"
      rounded="xl"
      shadow="xs"
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
          src={storageData ?? '/user.png'}
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
      <Box
        spaceY={{ base: '4', lg: '6' }}
        p={8}
        w="full"
        h="full"
        textAlign="left"
        mt={10}
      >
        <VStack gap="0" align="baseline">
          <Text
            fontSize="md"
            fontWeight="light"
            lineHeight="shorter"
            color={{ base: 'gray.800', _dark: 'gray.200' }}
          >
            Nome
          </Text>

          <Text
            textTransform="capitalize"
            fontSize="4xl"
            fontWeight="bold"
            lineHeight="shorter"
            color={{ base: 'colorPalette.800', _dark: 'colorPalette.200' }}
          >
            {owner?.name}
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          flex="1"
          w="full"
          gap="4"
          alignSelf="start"
        >
          <For each={loadedOwnerInfo}>
            {(item, index) => (
              <ItemDetails.Root
                key={`${index}-${item.label}`}
                direction="column"
              >
                <ItemDetails.Label>{item.label}</ItemDetails.Label>
                <ItemDetails.Value>{item.value}</ItemDetails.Value>
              </ItemDetails.Root>
            )}
          </For>
        </SimpleGrid>
      </Box>
    </Card.Root>
  )
}

export default CardInfoOwner
