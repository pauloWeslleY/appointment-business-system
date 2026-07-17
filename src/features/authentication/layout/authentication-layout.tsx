import {
  Box,
  Flex,
  For,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'

import { ColorModeButton } from '@/components/ui/color-mode'

import ItemContentAuthLayout from '../components/item-content-auth-layout'

const loadContentAuthLayout = [
  { id: 1, title: 'Agende seus clientes com facilidade' },
  { id: 2, title: 'Acompanhe o desempenho do seu negócio' },
  { id: 3, title: 'Gerencie seus serviços de forma eficiente' },
]

const AuthLayoutContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack
      align="center"
      minH="dvh"
      p={{ base: '4', md: '8' }}
      bgGradient="to-tl"
      gradientFrom={{ base: 'colorPalette.100', _dark: 'colorPalette.900/60' }}
      gradientTo={{ base: 'primary.100', _dark: 'primary.800' }}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={{ base: 4, md: 8 }}
        w="full"
        h="full"
        flex="1"
      >
        <Stack
          backdropFilter="blur(16px) saturate(160%)"
          justify="space-between"
          bg={{
            base: 'colorPalette.100/50',
            _dark: 'colorPalette.600/10',
          }}
          rounded="4xl"
          p="10"
          h="full"
          minH="2xl"
          pos="relative"
        >
          <Box pos="absolute" top="2" right="2">
            <ColorModeButton rounded="full" variant="ghost" />
          </Box>

          <Image src="/appointly-symbol.svg" alt="Logo" boxSize="36" />

          <Flex flexDir="column" gap={{ base: '2', lg: '14' }}>
            <Box spaceY="2">
              <Text
                as="h1"
                fontSize={{ base: '2xl', lg: '4xl' }}
                fontWeight="medium"
                fontFamily="heading"
                lineHeight="shorter"
                letterSpacing="wider"
                color={{ base: 'colorPalette.700', _dark: 'primary.200' }}
              >
                Sua agenda, seus clientes e seu negócio em um só lugar.
              </Text>
              <Text
                fontWeight="light"
                fontSize="sm"
                lineHeight="short"
                letterSpacing="wider"
              >
                Organize horários, clientes e serviços com facilidade!
              </Text>
            </Box>

            <HStack gap={{ base: '2', lg: '6' }}>
              <For each={loadContentAuthLayout}>
                {(item, index) => (
                  <ItemContentAuthLayout
                    key={item.id}
                    id={item.id}
                    index={index}
                    title={item.title}
                  />
                )}
              </For>
            </HStack>
          </Flex>
        </Stack>

        {children}
      </SimpleGrid>
    </VStack>
  )
}

export default AuthLayoutContainer
