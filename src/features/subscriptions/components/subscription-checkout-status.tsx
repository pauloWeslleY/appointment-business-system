import { Box, Button, Heading, Text } from '@chakra-ui/react'

import { useSubscriptionCheckoutStatus } from '../hooks/use-subscription-checkout-status'

export function SubscriptionCheckoutStatus() {
  const {
    isCheckoutStatusVisible,
    isCheckoutConfirmed,
    checkoutStatusTitle,
    checkoutStatusMessage,
    isRefreshingSubscriptionAccess,
    refreshSubscriptionAccess,
  } = useSubscriptionCheckoutStatus()

  return (
    <>
      {isCheckoutStatusVisible && (
        <Box
          role="status"
          bg={isCheckoutConfirmed ? 'green.subtle' : 'blue.subtle'}
          rounded="xl"
          p="5"
        >
          <Heading size="md">{checkoutStatusTitle}</Heading>
          <Text mt="2">{checkoutStatusMessage}</Text>

          <Button
            mt="3"
            rounded="lg"
            variant="solid"
            size="sm"
            colorPalette="gray"
            loading={isRefreshingSubscriptionAccess}
            onClick={refreshSubscriptionAccess}
          >
            Consultar novamente
          </Button>
        </Box>
      )}
    </>
  )
}
