import { Box, chakra, Flex, Icon } from '@chakra-ui/react'
import { BadgeCheck, InfoIcon, TriangleAlert, ZapIcon } from 'lucide-react'
import { useMemo } from 'react'

const StatusErrorPageOrganizationAlert = {
  INFO: 'info',
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
} as const

interface ErrorPageOrganizationAlertProps {
  status: (typeof StatusErrorPageOrganizationAlert)[keyof typeof StatusErrorPageOrganizationAlert]
  title: string
  description: string
}

const ErrorPageOrganizationAlert = ({
  status,
  title,
  description,
}: ErrorPageOrganizationAlertProps) => {
  const mapStatusAlert = useMemo<{
    color: string
    icon: React.ElementType
  }>(() => {
    const statusMap = {
      [StatusErrorPageOrganizationAlert.INFO]: {
        color: 'blue',
        icon: InfoIcon,
      },
      [StatusErrorPageOrganizationAlert.ERROR]: {
        color: 'red',
        icon: ZapIcon,
      },
      [StatusErrorPageOrganizationAlert.WARNING]: {
        color: 'yellow',
        icon: TriangleAlert,
      },
      [StatusErrorPageOrganizationAlert.SUCCESS]: {
        color: 'green',
        icon: BadgeCheck,
      },
    }
    return statusMap[status]
  }, [status])

  return (
    <Flex
      w="full"
      bg={{ _light: 'white', _dark: 'gray.800' }}
      shadow="xs"
      rounded="xl"
      borderWidth="1px"
      overflow="hidden"
    >
      <Flex
        justify="center"
        align="center"
        w={12}
        bg={`${mapStatusAlert.color}.500`}
      >
        <Icon as={mapStatusAlert.icon} color="white" boxSize={6} />
      </Flex>

      <Box mx={-3} py={2} px={4}>
        <Box mx={3}>
          <chakra.span
            color={{
              _light: `${mapStatusAlert.color}.500`,
              _dark: `${mapStatusAlert.color}.400`,
            }}
            fontWeight="bold"
          >
            {title}
          </chakra.span>
          <chakra.p
            color={{ _light: 'gray.600', _dark: 'gray.200' }}
            fontSize="sm"
          >
            {description}
          </chakra.p>
        </Box>
      </Box>
    </Flex>
  )
}

export default ErrorPageOrganizationAlert
