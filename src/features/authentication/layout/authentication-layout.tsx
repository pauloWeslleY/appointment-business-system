import { Box, Flex, For, Grid, GridItem, VStack } from '@chakra-ui/react'

import { ColorModeButton } from '@/components/ui/color-mode'

import BannerAuth from '../components/banner-auth'
import { GEOMETRICS_LAYOUT } from '../constants/geometrics-layout'

const AuthLayoutContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack
      align="center"
      isolation="isolate"
      minH="dvh"
      p={{ base: '4', md: '8' }}
      bgGradient="to-tl"
      gradientFrom={{ _light: 'navy.300', _dark: 'brand.navy' }}
      gradientTo={{ _light: 'app.accent', _dark: 'app.primary' }}
    >
      <Box
        zIndex="1"
        position="absolute"
        inset="0"
        overflow="hidden"
        pointerEvents="none"
        aria-hidden="true"
      >
        <For each={GEOMETRICS_LAYOUT}>
          {({ name, ...shapeProps }) => (
            <Box key={name} position="absolute" {...shapeProps} />
          )}
        </For>
      </Box>

      <Grid
        zIndex="2"
        templateColumns={{ base: '1fr', xl: '1fr 600px' }}
        gap="2"
        w="full"
        h="full"
        flex="1"
      >
        <BannerAuth
          shadow="xs"
          border="1px solid"
          borderColor={{ _light: 'slate.200', _dark: 'slate.400/30' }}
          rounded="4xl"
        />

        <GridItem
          colSpan={1}
          shadow="xs"
          minW="0"
          rounded="4xl"
          border="1px solid"
          borderColor={{ _light: 'slate.200', _dark: 'slate.400/30' }}
          p={{ base: '4', md: '8' }}
          bg={{ _light: 'slate.100/40', _dark: 'slate.900/40' }}
          backdropFilter="blur(3px) saturate(160%)"
          asChild
        >
          <Flex flexDir="column" justify="center" pos="relative">
            <Box
              pos="absolute"
              top="2"
              right="2"
              display={{ base: 'block', xl: 'none' }}
            >
              <ColorModeButton rounded="full" variant="ghost" />
            </Box>

            {children}
          </Flex>
        </GridItem>
      </Grid>
    </VStack>
  )
}

export default AuthLayoutContainer
