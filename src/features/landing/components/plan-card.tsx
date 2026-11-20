import { Badge, Button, Heading, Stack, Text } from '@chakra-ui/react'

import { getAdminHref } from '@/shared/config/site-domains'
import { formatCurrencyInCents } from '@/shared/utils/formatted-price'

import { monthlyPlanPrice, type plans } from '../constants/data-plans'

interface PlanCardProps {
  plan: (typeof plans)[number]
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const isAnnualPlan = plan.type === 'annual'
  const planPriceInCents = Math.round(plan.price * 100)
  const annualSavingsInCents =
    Math.round(monthlyPlanPrice * 12 * 100) - planPriceInCents

  return (
    <Stack
      as="article"
      gap="5"
      p={{ base: '5', lg: '6' }}
      borderWidth="1px"
      borderColor={isAnnualPlan ? 'sea.400' : 'slate.200'}
      bg={isAnnualPlan ? 'sea.50' : 'white'}
      rounded="2xl"
      shadow={isAnnualPlan ? 'sm' : undefined}
      minW="0"
      h="full"
    >
      <Stack gap="2">
        <Heading as="h3" fontSize="xl" color="brand.navy">
          {plan.title}
        </Heading>
        {isAnnualPlan && (
          <Badge
            alignSelf="flex-start"
            bg="sea.100"
            color="sea.900"
            rounded="full"
            px="3"
            py="1"
          >
            Economize {formatCurrencyInCents(annualSavingsInCents)} por ano
          </Badge>
        )}
        <Text
          color="brand.navy"
          fontSize={{ base: '3xl', lg: '4xl' }}
          lineHeight="short"
          fontWeight="bold"
        >
          {formatCurrencyInCents(planPriceInCents)}{' '}
          <Text as="span" color="brand.slate" fontSize="md" fontWeight="medium">
            por {isAnnualPlan ? 'ano' : 'mês'}
          </Text>
        </Text>
        {isAnnualPlan && (
          <Text color="sea.900" fontSize="sm">
            Equivale a cerca de{' '}
            <Text as="strong" fontSize="md">
              R$ {Math.round(plan.price / 12)} por mês
            </Text>
            .
          </Text>
        )}
      </Stack>

      <Stack gap="2" mt="auto">
        <Button
          asChild
          w="full"
          size="sm"
          minH="11"
          rounded="lg"
          whiteSpace="normal"
          bg={isAnnualPlan ? 'brand.navy' : 'white'}
          color={isAnnualPlan ? 'white' : 'brand.navy'}
          borderWidth="1px"
          borderColor={isAnnualPlan ? 'brand.navy' : 'slate.200'}
          transition="background-color 150ms ease-out"
          _hover={{ bg: isAnnualPlan ? 'navy.800' : 'slate.50' }}
          _active={{ bg: isAnnualPlan ? 'navy.900' : 'slate.100' }}
        >
          <a href={getAdminHref('/register')}>Testar grátis por 7 dias</a>
        </Button>
        <Text color="brand.slate" fontSize="sm" textAlign="center">
          Sem cartão de crédito
        </Text>
      </Stack>
    </Stack>
  )
}

export default PlanCard
