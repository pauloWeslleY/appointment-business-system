import {
  Box,
  Flex,
  Icon,
  IconButton,
  Separator,
  Stack,
  type StackProps,
} from '@chakra-ui/react'
import { ChevronLeft } from 'lucide-react'

import CurrentPlan from '@/components/current-plain'
import Logotipo from '@/components/logotipo'
import { Tooltip } from '@/components/ui/tooltip'
import { useMenuCollapse } from '@/shared/store/menu-collapse'

import SidebarCurrentUser from './sidebar-current-user'

interface SidebarAsideProps extends StackProps {
  loading?: boolean
}

const SidebarAside = ({ loading = false, ...props }: SidebarAsideProps) => {
  const { collapsed, setCollapsed } = useMenuCollapse()

  return (
    <Stack
      as="aside"
      display={{ base: 'none', lg: 'flex' }}
      flexShrink="0"
      gap="0"
      align="flex-start"
      h="dvh"
      bg="sidebar.aside.bg"
      w={collapsed ? '20' : '60'}
      transition="width 0.2s ease"
      pos="relative"
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
          right="-2"
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

      <Stack
        w="full"
        h="full"
        minH="0"
        overflowY="auto"
        gap="0"
        align="flex-start"
        px="2"
        pb="4"
      >
        <Box w="full">
          <Flex
            px="4"
            py="5"
            align="center"
            justify={collapsed ? 'center' : 'flex-start'}
            gap="2"
          >
            <Logotipo
              variant={collapsed ? 'icon' : 'horizontal'}
              w={collapsed ? '10' : 'full'}
              h={collapsed ? '10' : '14'}
              objectFit="contain"
              flexShrink="0"
            />
          </Flex>

          <Separator
            borderColor={{ _light: 'gray.300', _dark: 'secondary.500/50' }}
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
        >
          {!loading && <CurrentPlan />}

          <Separator
            w="full"
            borderColor={{ _light: 'gray.300', _dark: 'secondary.500/50' }}
          />

          {!loading && <SidebarCurrentUser />}
        </Flex>
      </Stack>
    </Stack>
  )
}

export default SidebarAside
