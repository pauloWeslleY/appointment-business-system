import {
  Alert,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Link, useRouteContext } from '@tanstack/react-router'
import { Crown } from 'lucide-react'
import { useMemo } from 'react'

import { subscriptionAccessQueryOptions } from '@/features/subscriptions/queries/subscription.query-options'
import {
  BillingIntervals,
  mapLabelBillingInterval,
} from '@/features/subscriptions/types/billing-interval.type'
import {
  mapLabelSubscriptionStatus,
  mapLabelSubscriptionStatusColor,
  SubscriptionStatuses,
} from '@/features/subscriptions/types/subscription-status.type'
import { RESOURCES } from '@/shared/constants/permission'
import { usePermissions } from '@/shared/hooks/use-permissions'
import { useMenuCollapse } from '@/shared/store/menu-collapse'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'

import { Tooltip } from './ui/tooltip'

interface CurrentPlanProps {
  expanded?: boolean
  onNavigate?: () => void
}

const CurrentPlan = ({ expanded = false, onNavigate }: CurrentPlanProps) => {
  const { session } = useRouteContext({ from: '/_app' })
  const menu = useMenuCollapse()
  const collapsed = !expanded && menu.collapsed
  const { subscriptions } = usePermissions([RESOURCES.SUBSCRIPTION])
  const { data: currentSubscription } = useQuery(
    subscriptionAccessQueryOptions(
      session.user.id,
      session.session.activeOrganizationId ?? '',
    ),
  )

  const isOnlyRead =
    currentSubscription?.access.canRead && !currentSubscription?.access.canWrite
  const isOnlyModeRead = isOnlyRead ?? true
  const statusSubscription =
    currentSubscription?.access?.status ?? SubscriptionStatuses.PAYMENT_REQUIRED

  const currentPlan = useMemo(
    () => ({
      type: mapLabelBillingInterval[
        currentSubscription?.subscription?.billingInterval ??
          BillingIntervals.MONTHLY
      ],
      status: mapLabelSubscriptionStatus[statusSubscription],
      mapStatusColor: mapLabelSubscriptionStatusColor[statusSubscription],
    }),
    [currentSubscription?.subscription?.billingInterval, statusSubscription],
  )

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
      bg={{ _light: 'navy.100', _dark: 'secondary.900' }}
      borderWidth="1px"
      borderColor={{ _light: 'gray.300', _dark: 'secondary.500/20' }}
    >
      <HStack gap={!collapsed ? '4' : '0'}>
        <Tooltip
          content={`Você está no Plano: ${currentPlan.type}`}
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
          <Box spaceY="1">
            <Text
              as="span"
              fontSize="sm"
              color={{ _light: 'gray.800', _dark: 'gray.200' }}
            >
              Plano: {currentPlan.type}
            </Text>
            <HStack gap="2">
              <Text
                as="span"
                fontSize="xs"
                color={{ _light: 'gray.800', _dark: 'gray.200' }}
              >
                Vencimento:
              </Text>
              <Tooltip
                content={`Status: ${currentPlan.status}`}
                showArrow
                positioning={{ placement: 'top-start' }}
              >
                <Badge
                  size="xs"
                  variant="subtle"
                  colorPalette={currentPlan.mapStatusColor}
                >
                  {formattedDateAndHours(
                    currentSubscription?.subscription?.paidUntil ?? null,
                  )}
                </Badge>
              </Tooltip>
            </HStack>
          </Box>
        )}
      </HStack>

      {isOnlyModeRead && (
        <Alert.Root status="warning" variant="surface" rounded="lg" size="sm">
          <Alert.Indicator />
          <Alert.Title>Modo de leitura</Alert.Title>
        </Alert.Root>
      )}

      {subscriptions.canRead && (
        <>
          {!collapsed && (
            <Button
              asChild
              w="full"
              rounded="lg"
              colorPalette="grey"
              variant="surface"
              size="xs"
            >
              <Link to="/subscription" onClick={onNavigate}>
                Gerenciar plano
              </Link>
            </Button>
          )}
        </>
      )}
    </Flex>
  )
}

export default CurrentPlan
