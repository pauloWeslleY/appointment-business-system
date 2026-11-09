import {
  Box,
  Card,
  Flex,
  For,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
} from '@chakra-ui/react'

import { cardCss, cardSectionCss } from '@/theme/styles/global-styles'

const PageLoader = () => {
  return (
    <Box
      role="status"
      aria-label="Carregando página"
      aria-busy="true"
      w="full"
      minW="0"
      p={{ base: '4', md: '8' }}
    >
      <Stack gap="6" aria-hidden="true">
        <Flex justify="space-between" align="center" gap="4" wrap="wrap">
          <HStack gap="3" flex="1" minW="0">
            <Skeleton boxSize="8" rounded="lg" flexShrink="0" />
            <Skeleton h="7" w="64" maxW="full" rounded="lg" />
          </HStack>
          <Skeleton h="8" w="44" rounded="lg" />
        </Flex>

        <Card.Root variant="outline" css={cardSectionCss}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
            <For each={[0, 1, 2]}>
              {(item) => (
                <Stack key={item} gap="3" minW="0">
                  <Skeleton h="4" w="56" maxW="full" rounded="md" />
                  <Skeleton h="6" w="10" rounded="md" />
                </Stack>
              )}
            </For>
          </SimpleGrid>
        </Card.Root>

        <Flex gap="2" direction={{ base: 'column', md: 'row' }}>
          <Skeleton h="9" w={{ base: 'full', md: '350px' }} rounded="xl" />
          <Skeleton h="9" w={{ base: 'full', md: '250px' }} rounded="xl" />
        </Flex>

        <Card.Root variant="outline" css={cardSectionCss}>
          <SimpleGrid columns={{ base: 1, xl: 2 }} gap="4">
            <For each={[0, 1, 2, 3]}>
              {(item) => (
                <Card.Root key={item} variant="outline" css={cardCss}>
                  <Flex align="center" gap="3" p="2">
                    <Skeleton
                      w={{ base: '16', md: '24' }}
                      h="20"
                      rounded="lg"
                      flexShrink="0"
                    />
                    <Stack gap="4" flex="1" minW="0">
                      <HStack gap="3">
                        <Skeleton h="5" w="60%" rounded="md" />
                        <Skeleton h="4" w="12" rounded="md" />
                      </HStack>
                      <Skeleton h="4" w="85%" rounded="md" />
                      <Skeleton h="4" w="65%" rounded="md" />
                      <Skeleton h="4" w="90%" rounded="md" />
                      <Skeleton h="4" w="70%" rounded="md" />
                      <SimpleGrid columns={3} gap="3">
                        <For each={[0, 1, 2]}>
                          {(stat) => <Skeleton key={stat} h="4" rounded="md" />}
                        </For>
                      </SimpleGrid>
                    </Stack>
                  </Flex>
                  <Flex
                    borderTopWidth="1px"
                    borderColor="border.subtle"
                    justify="space-around"
                    gap="4"
                    p="3"
                  >
                    <Skeleton h="5" w="20%" rounded="md" />
                    <Skeleton h="5" w="45%" rounded="md" />
                  </Flex>
                </Card.Root>
              )}
            </For>
          </SimpleGrid>

          <Flex justify="space-between" gap="4" wrap="wrap" mt="6">
            <HStack gap="2">
              <For each={[0, 1, 2, 3, 4]}>
                {(item) => <Skeleton key={item} boxSize="8" rounded="lg" />}
              </For>
            </HStack>
            <Skeleton h="4" w="56" maxW="full" rounded="md" />
          </Flex>
        </Card.Root>
      </Stack>
    </Box>
  )
}

export default PageLoader
