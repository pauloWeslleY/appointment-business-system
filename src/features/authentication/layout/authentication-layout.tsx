import { Box, Flex, GridItem, SimpleGrid, VStack } from '@chakra-ui/react'

import { ColorModeButton } from '@/components/ui/color-mode'

import BannerAuth from '../components/banner-auth'

const AuthLayoutContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack
      align="center"
      minH="dvh"
      p={{ base: '4', md: '8' }}
      bgGradient="to-tl"
      gradientFrom={{ base: 'navy.300', _dark: 'brand.navy' }}
      gradientTo={{ base: 'app.accent', _dark: 'app.primary' }}
      pos="relative"
    >
      <Box
        pos="absolute"
        top="2"
        right="2"
        display={{ base: 'block', md: 'none' }}
      >
        <ColorModeButton rounded="full" variant="ghost" />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} w="full" h="full" flex="1">
        <BannerAuth />

        <GridItem
          colSpan={1}
          p={{ base: '4', md: '8' }}
          rounded="4xl"
          bg={{ base: 'slate.100/40', _dark: 'slate.900/40' }}
          backdropFilter="blur(16px) saturate(160%)"
          asChild
        >
          <Flex flexDir="column" justify="center">
            {children}
          </Flex>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}

export default AuthLayoutContainer
