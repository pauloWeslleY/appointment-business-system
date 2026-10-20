import { Box, Flex, For, Image, Stack, Text } from '@chakra-ui/react'

import { ColorModeButton, useColorModeValue } from '@/components/ui/color-mode'

import { GeometricBackground } from './geometric-background'
import ItemContentAuthLayout from './item-content-auth-layout'

const loadContentAuthLayout = [
  {
    title: 'Agende seus clientes com facilidade',
    description: 'Interface simples e intuitiva para o dia a dia.',
  },
  {
    title: 'Acompanhe o desempenho do seu negócio',
    description: 'Monitore o crescimento e o desempenho do seu negócio.',
  },
  {
    title: 'Gerencie seus serviços de forma eficiente',
    description:
      'Organize e administre seus serviços de maneira prática e eficaz.',
  },
] as const

const BannerAuth = () => {
  const logo = useColorModeValue(
    '/logo/icon-gradient.svg',
    '/logo/icon-navy.svg',
  )

  return (
    <Stack
      gridColumn="span 2"
      display={{ base: 'none', md: 'flex' }}
      gap={{ base: '4', lg: '12' }}
      backdropFilter="blur(16px) saturate(160%)"
      bg={{ base: 'slate.200/40', _dark: 'navy.600/20' }}
      rounded="4xl"
      p="10"
      h="full"
      minH="2xl"
      pos="relative"
      overflow="hidden"
    >
      <Box
        pos="absolute"
        top="2"
        right="2"
        display={{ base: 'none', md: 'block' }}
      >
        <ColorModeButton rounded="full" variant="ghost" />
      </Box>

      <GeometricBackground zIndex="-1" />

      {/* Logo and system name */}
      <Flex align="center" gap="2">
        <Image src={logo} alt="Logo" boxSize="14" />

        <Box>
          <Text
            fontWeight="extrabold"
            fontSize="lg"
            lineHeight="shorter"
            letterSpacing="wider"
            fontFamily="heading"
            color={{ base: 'slate.900', _dark: 'navy.900' }}
          >
            System
          </Text>
          <Text
            fontWeight="extrabold"
            fontSize="lg"
            lineHeight="shorter"
            letterSpacing="wider"
            fontFamily="heading"
            color={{ base: 'slate.900', _dark: 'navy.900' }}
          >
            Appointment
          </Text>
        </Box>
      </Flex>

      {/* Main content: heading, description, and features list */}
      <Flex flexDir="column" gap={{ base: '2', lg: '20' }}>
        <Box spaceY="4" maxW="xl">
          <Text
            as="h1"
            fontSize={{ base: '2xl', lg: '5xl' }}
            fontWeight="extrabold"
            fontFamily="heading"
            lineHeight="shorter"
            letterSpacing="short"
            color="navy.700"
          >
            Sua agenda, seus clientes e seu negócio{' '}
            <Text as="span" color={{ base: 'sea.800', _dark: 'sea.100' }}>
              em um só lugar.
            </Text>
          </Text>

          <Text
            fontWeight="medium"
            fontSize="lg"
            lineHeight="short"
            letterSpacing="wider"
            color="navy.700"
          >
            Organize horários, clientes e serviços com facilidade e faça o seu
            negócio crescer.
          </Text>
        </Box>

        <Box
          w="full"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(800px, 1fr))"
          gap={{ base: '2', lg: '6' }}
        >
          <For each={loadContentAuthLayout}>
            {(item, index) => (
              <ItemContentAuthLayout key={index} index={index} item={item} />
            )}
          </For>
        </Box>
      </Flex>
    </Stack>
  )
}

export default BannerAuth
