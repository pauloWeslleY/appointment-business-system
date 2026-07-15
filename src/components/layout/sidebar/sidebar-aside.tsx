import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Separator,
  Stack,
  type StackProps,
  Text,
} from '@chakra-ui/react'
import { ChevronLeft } from 'lucide-react'

import ButtonLogout from '@/components/button-logout'
import { Tooltip } from '@/components/ui/tooltip'
import { authClient } from '@/shared/auth'
import { useMenuCollapse } from '@/shared/store/menu-collapse'

interface SidebarAsideProps extends StackProps {
  loading?: boolean
}

const SidebarAside = ({ loading = false, ...props }: SidebarAsideProps) => {
  const { collapsed, setCollapsed } = useMenuCollapse()
  const { data } = authClient.useSession()

  return (
    <Stack
      as="aside"
      gap="0"
      align="flex-start"
      h="full"
      px="2"
      pb="10"
      bg={{ base: 'colorPalette.100/10', _dark: 'gray.900/90' }}
      borderRightWidth="1px"
      borderRightColor={{ base: 'gray.200', _dark: 'gray.700' }}
      w={collapsed ? '20' : '60'}
      transition="width 0.2s ease"
      pos="relative"
      shadow={!collapsed ? 'none' : 'sm'}
      {...props}
    >
      <Tooltip
        content={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        showArrow
      >
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          colorPalette="gray"
          size="2xs"
          rounded="lg"
          variant="surface"
          shadow="2xs"
          pos="absolute"
          top="4"
          right="-3"
          zIndex="2"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon
            as={ChevronLeft}
            boxSize="4"
            transition="transform 0.2s ease"
            transform={collapsed ? 'rotate(180deg)' : 'rotate(0deg)'}
          />
        </IconButton>
      </Tooltip>

      <Box w="full">
        <Flex
          px="4"
          py="5"
          align="center"
          justify={collapsed ? 'center' : 'flex-start'}
          gap="2"
        >
          <Image
            src="/appointly-symbol.svg"
            alt="Appointly Logo"
            boxSize="10"
          />

          {!collapsed && (
            <div>
              <Text
                fontFamily="heading"
                fontSize="lg"
                fontWeight="semibold"
                color={{ base: 'colorPalette.600', _dark: 'colorPalette.400' }}
              >
                Appointly
              </Text>
              <Text
                fontFamily="heading"
                fontSize="xs"
                color={{ base: 'gray.400', _dark: 'gray.600' }}
                fontWeight="semibold"
              >
                Booking System
              </Text>
            </div>
          )}
        </Flex>

        <Separator
          borderColor={{ base: 'gray.700', _dark: 'colorPalette.800/60' }}
        />

        <Flex
          as="nav"
          direction="column"
          fontSize="sm"
          aria-label="Main Navigation"
          mt="2"
          gap="1"
        >
          {props.children}
        </Flex>
      </Box>

      <Flex
        flexDir="column"
        flex="1"
        w="full"
        gap="4"
        align="center"
        justify="flex-end"
        px="4"
      >
        {!loading && (
          <>
            <HStack
              w="full"
              justify={!collapsed ? 'center' : 'flex-start'}
              gap="2"
            >
              <Avatar.Root
                shape="full"
                size="sm"
                borderWidth="1px"
                borderColor="colorPalette.500"
                bg={{ base: 'colorPalette.100', _dark: 'colorPalette.300/40' }}
                color={{ base: 'colorPalette.400', _dark: 'colorPalette.500' }}
              >
                <Avatar.Fallback />
                <Avatar.Image src={data?.user?.image ?? ''} />
              </Avatar.Root>

              {!collapsed && (
                <Box>
                  <Text
                    lineHeight="1"
                    fontWeight="medium"
                    color={{
                      base: 'colorPalette.600',
                      _dark: 'colorPalette.700',
                    }}
                  >
                    {data?.user?.name ?? 'Usuário'}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={{ base: 'gray.400', _dark: 'gray.700' }}
                    truncate
                  >
                    {data?.user?.email ?? 'email@example.com'}
                  </Text>
                </Box>
              )}
            </HStack>

            <ButtonLogout />
          </>
        )}
      </Flex>
    </Stack>
  )
}

export default SidebarAside
