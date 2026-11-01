import { Box, Button, Flex, HStack, Icon, Text } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { Crown } from 'lucide-react'

import { RESOURCES } from '@/shared/constants/permission'
import { usePermissions } from '@/shared/hooks/use-permissions'
import { useMenuCollapse } from '@/shared/store/menu-collapse'

import { Tooltip } from './ui/tooltip'

const CurrentPlan = () => {
  const { collapsed } = useMenuCollapse()
  const { subscriptions } = usePermissions([RESOURCES.SUBSCRIPTION])

  return (
    <Flex
      flexDir="column"
      align={collapsed ? 'center' : 'flex-start'}
      justify={collapsed ? 'center' : 'flex-start'}
      px={collapsed ? '8' : '2'}
      w="full"
      py="2"
      gap="4"
      rounded="xl"
      shadow="xs"
      bg={{ base: 'navy.100', _dark: 'secondary.900' }}
      borderWidth="1px"
      borderColor={{ base: 'gray.300', _dark: 'secondary.500/20' }}
    >
      <HStack gap={!collapsed ? '4' : '0'}>
        <Tooltip
          content="Você está no plano Básico."
          showArrow
          positioning={{ placement: 'top-start' }}
        >
          <Flex
            p="2"
            rounded="lg"
            bg={{ _light: 'yellow.300', _dark: 'yellow.800' }}
          >
            <Icon
              as={Crown}
              boxSize="4"
              color={{ _light: 'yellow.800', _dark: 'yellow.300' }}
            />
          </Flex>
        </Tooltip>

        {!collapsed && (
          <Box>
            <Text
              as="span"
              fontSize="md"
              color={{ _light: 'gray.800', _dark: 'gray.200' }}
            >
              Plano atual
            </Text>
            <Text
              fontSize="sm"
              color={{ _light: 'gray.800', _dark: 'gray.400' }}
            >
              Você está no plano Básico.
            </Text>
          </Box>
        )}
      </HStack>

      {subscriptions.canRead && (
        <>
          {!collapsed && (
            <Button
              asChild
              w="full"
              rounded="lg"
              colorPalette="grey"
              variant="surface"
            >
              <Link to="/subscription">Gerenciar plano</Link>
            </Button>
          )}
        </>
      )}
    </Flex>
  )
}

export default CurrentPlan
