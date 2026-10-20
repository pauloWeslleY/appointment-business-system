import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { Crown } from 'lucide-react'

import { useMenuCollapse } from '@/shared/store/menu-collapse'

const CurrentPlan = () => {
  const { collapsed } = useMenuCollapse()

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
      <HStack gap="4" display={collapsed ? 'none' : 'flex'}>
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

        <Box>
          <Text
            as="span"
            fontSize="md"
            color={{ _light: 'gray.800', _dark: 'gray.200' }}
          >
            Plano atual
          </Text>
          <Text fontSize="sm" color={{ _light: 'gray.800', _dark: 'gray.400' }}>
            Você está no plano Básico.
          </Text>
        </Box>
      </HStack>

      {collapsed ? (
        <IconButton
          aria-label="Plano atual"
          variant="surface"
          colorPalette="yellow"
          rounded="lg"
          size="sm"
        >
          <Icon
            as={Crown}
            boxSize="4"
            color={{ _light: 'yellow.800', _dark: 'yellow.300' }}
          />
        </IconButton>
      ) : (
        <Button w="full" rounded="lg" colorPalette="grey" variant="surface">
          Gerenciar plano
        </Button>
      )}
    </Flex>
  )
}

export default CurrentPlan
