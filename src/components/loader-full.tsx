import { Box, Flex, For, HStack, Skeleton, Stack } from '@chakra-ui/react'

import { useMenuCollapse } from '@/shared/store/menu-collapse'

import PageLoader from './page-loader'

const LoaderFull = () => {
  const collapsed = useMenuCollapse((state) => state.collapsed)

  return (
    <Flex w="full" minW="0" h="dvh" overflow="hidden" aria-busy="true">
      <Stack
        aria-hidden="true"
        display={{ base: 'none', lg: 'flex' }}
        w={collapsed ? '20' : '60'}
        flexShrink="0"
        bg="sidebar.aside.bg"
        px="4"
        py="6"
        gap="6"
        overflowY="auto"
      >
        <Skeleton h="14" w="full" rounded="lg" />
        <Stack gap="4">
          {!collapsed && <Skeleton h="3" w="12" rounded="md" />}
          <For each={[0, 1, 2, 3, 4, 5]}>
            {(item) => (
              <HStack key={item} gap="3">
                <Skeleton boxSize="6" rounded="md" flexShrink="0" />
                {!collapsed && <Skeleton h="4" flex="1" rounded="md" />}
              </HStack>
            )}
          </For>
        </Stack>
        <Stack gap="4">
          {!collapsed && <Skeleton h="3" w="12" rounded="md" />}
          <HStack gap="3">
            <Skeleton boxSize="6" rounded="md" flexShrink="0" />
            {!collapsed && <Skeleton h="4" flex="1" rounded="md" />}
          </HStack>
        </Stack>
        <Stack mt="auto" gap="4" pt="8">
          {!collapsed && <Skeleton h="28" rounded="xl" />}
          <HStack gap="3">
            <Skeleton boxSize="8" rounded="full" flexShrink="0" />
            {!collapsed && (
              <Stack gap="2" flex="1">
                <Skeleton h="3" w="70%" rounded="md" />
                <Skeleton h="3" rounded="md" />
              </Stack>
            )}
          </HStack>
        </Stack>
      </Stack>

      <Box flex="1" minW="0" h="full" overflowY="auto" bg="sidebar.content.bg">
        <Flex
          aria-hidden="true"
          minH="20"
          align="center"
          justify="space-between"
          px={{ base: '4', md: '8' }}
          py="3"
          gap="4"
        >
          <HStack gap="3" minW="0" flex="1">
            <Skeleton
              display={{ lg: 'none' }}
              boxSize="8"
              rounded="lg"
              flexShrink="0"
            />
            <Stack gap="2" w="48" maxW="full">
              <Skeleton h="4" w="65%" rounded="md" />
              <Skeleton h="3" rounded="md" />
            </Stack>
          </HStack>
          <HStack gap={{ base: '2', md: '4' }}>
            <Skeleton boxSize="7" rounded="full" />
            <Skeleton
              display={{ base: 'none', sm: 'block' }}
              boxSize="7"
              rounded="lg"
            />
            <Skeleton boxSize="8" rounded="full" />
            <Stack display={{ base: 'none', md: 'flex' }} gap="2" w="20">
              <Skeleton h="3" rounded="md" />
              <Skeleton h="3" w="75%" rounded="md" />
            </Stack>
          </HStack>
        </Flex>
        <Box maxW="breakpoint-2xl" mx="auto">
          <PageLoader />
        </Box>
      </Box>
    </Flex>
  )
}

export default LoaderFull
