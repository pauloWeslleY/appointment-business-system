import {
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Separator,
  Stack,
  type StackProps,
  Text,
} from '@chakra-ui/react'
import { ChevronLeft } from 'lucide-react'

import CurrentPlan from '@/components/current-plain'
import { useColorModeValue } from '@/components/ui/color-mode'
import { Tooltip } from '@/components/ui/tooltip'
import { useMenuCollapse } from '@/shared/store/menu-collapse'

interface SidebarAsideProps extends StackProps {
  loading?: boolean
}

const LogotipoSystemAppointment = {
  light: '/logo/app-light.svg',
  dark: '/logo/app-dark.svg',
} as const

type LogotipoSystemAppointmentType =
  (typeof LogotipoSystemAppointment)[keyof typeof LogotipoSystemAppointment]

const SidebarAside = ({ loading = false, ...props }: SidebarAsideProps) => {
  const { collapsed, setCollapsed } = useMenuCollapse()
  const logotipo = useColorModeValue<LogotipoSystemAppointmentType>(
    LogotipoSystemAppointment.light,
    LogotipoSystemAppointment.dark,
  )

  return (
    <Stack
      as="aside"
      display={{ base: 'none', md: 'flex' }}
      gap="0"
      align="flex-start"
      h="dvh"
      px="2"
      pb="10"
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
          <Image src={logotipo} alt="Logotipo do sistema" boxSize="10" />

          {!collapsed && (
            <div>
              <Text
                fontFamily="heading"
                fontWeight="semibold"
                fontSize="lg"
                color={{ base: 'navy.800', _dark: 'sea.300' }}
              >
                System
              </Text>
              <Text
                fontFamily="heading"
                fontWeight="semibold"
                fontSize="xs"
                color={{ base: 'navy.800', _dark: 'sea.300' }}
              >
                Appointment
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
      >
        {!loading && <CurrentPlan />}
      </Flex>
    </Stack>
  )
}

export default SidebarAside
