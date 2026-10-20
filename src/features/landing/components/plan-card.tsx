import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { Check } from 'lucide-react'

import type { plans } from '../constants/data-plans'

interface PlanCardProps {
  index: number
  plan: (typeof plans)[number]
}

const mapLabelTypePlan = (type: string) => {
  const labels: Record<string, { label: string; value: string }> = {
    monthly: { label: '/Mês', value: 'Mensal' },
    annual: { label: '/Ano', value: 'Anual' },
  }

  return labels[type] || { label: 'Sem plano', value: 'sem plano' }
}

const PlanCard = ({ plan, index }: PlanCardProps) => {
  return (
    <Box
      borderWidth={index === 1 ? '2px' : '1px'}
      borderColor={index === 1 ? 'purple.500' : 'slate.100'}
      shadow={index === 1 ? 'sm' : undefined}
      rounded="xl"
      p="5"
      flex="1"
      h="full"
    >
      {index === 1 && (
        <Text
          textAlign="center"
          fontSize="lg"
          bg="purple.500"
          color="white"
          rounded="full"
          px="3"
          py="1"
          mt="-10"
        >
          Mais econômico
        </Text>
      )}

      <Box mt="4">
        <Heading
          as="h3"
          fontSize="xl"
          fontWeight="bold"
          textAlign="center"
          lineHeight="short"
        >
          {plan.title}
        </Heading>
        <Text fontSize="sm" textAlign="center">
          {mapLabelTypePlan(plan.type).value}
        </Text>
      </Box>

      <HStack
        align="center"
        gap="1"
        justify="center"
        mb={index === 0 ? '10' : '0'}
      >
        <strong>R$</strong>

        <Flex align="baseline">
          <Text fontSize="5xl" fontWeight="bold" letterSpacing="-1px">
            {plan.price.toLocaleString('pt-BR', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </Text>

          <Text fontSize="lg" alignSelf="flex-end" mb="4">
            {mapLabelTypePlan(plan.type).label}
          </Text>
        </Flex>
      </HStack>

      {index === 1 && (
        <Flex
          placeContent="center"
          bg="purple.500/10"
          rounded="xl"
          mb="5"
          mx="auto"
          w="xs"
        >
          <Text fontSize="sm" color="purple.500">
            Equivalente a apenas <strong>R$ 29,17 por mês</strong>
          </Text>
        </Flex>
      )}

      <Stack gap="2" mb="5">
        {plan.items.map((item) => (
          <HStack key={item} fontSize="12px" color="brand.slate">
            <Flex rounded="full" bg="sea.100" p="1">
              <Check size={15} color="#20ada6" />
            </Flex>
            {item}
          </HStack>
        ))}
      </Stack>

      <Button
        asChild
        w="full"
        colorPalette="brand"
        _hover={{ bg: 'brand.navy', color: 'white' }}
        size="sm"
        rounded="lg"
      >
        <Link to="/register">Começar agora</Link>
      </Button>
    </Box>
  )
}

export default PlanCard
