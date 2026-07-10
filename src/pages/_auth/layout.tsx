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
import { createFileRoute, Outlet } from '@tanstack/react-router'

import { ColorModeButton } from '@/components/ui/color-mode'

import ItemContentAuthLayout from './-components/item-content-auth-layout'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

const loadContentAuthLayout = [
  { id: 1, title: 'Agende seus clientes com facilidade' },
  { id: 2, title: 'Acompanhe o desempenho do seu negócio' },
  { id: 3, title: 'Gerencie seus serviços de forma eficiente' },
]

function AuthLayout() {
  return (
    <VStack align="center" minH="100vh" p={{ base: '4', md: '8' }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={{ base: 4, md: 8 }}
        w="full"
        h="full"
        flex="1"
      >
        <Stack
          justify="space-between"
          bgGradient="to-tr"
          gradientFrom={{
            base: 'colorPalette.100',
            _dark: 'colorPalette.900/60',
          }}
          gradientTo={{ base: 'pink.100', _dark: 'pink.900/60' }}
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
                color={{ base: 'blackAlpha.800', _dark: 'gray.100' }}
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

        <Outlet />
      </SimpleGrid>
    </VStack>
  )
}
