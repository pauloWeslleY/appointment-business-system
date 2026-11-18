import { Box, HStack, Separator, Text } from '@chakra-ui/react'
import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { InfoIcon } from 'lucide-react'

import Header from '@/components/layout/header'
import StatusServiceEstablishment from '@/features/service-establishment/components/status-service-establishment'
import ServiceEstablishmentDetails from '@/features/service-establishment/pages/service-establishment-details'
import { ServiceEstablishmentDetailsRouteSearchSchema } from '@/features/service-establishment/schemas/service-establishment-details-route-search.schema'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/services/_pages/$serviceEstablishmentId/info/',
)({
  validateSearch: ServiceEstablishmentDetailsRouteSearchSchema,
  component: ServiceEstablishmentInfoPage,
  head: () => ({
    meta: [
      {
        title: 'Detalhes do serviço | Agendros',
      },
    ],
  }),
})

const ServiceEstablishmentRoute = getRouteApi(
  '/_app/_authenticated/dashboard/$slug/services/_pages/$serviceEstablishmentId',
)

function ServiceEstablishmentInfoPage() {
  const serviceEstablishment = ServiceEstablishmentRoute.useLoaderData()

  return (
    <Box spaceY="4" w="full">
      <Header.Root>
        <Header.Button />

        <HStack gap="2" align="center">
          <Header.Icon icon={InfoIcon} />

          <HStack gap="4">
            <Header.Title fontWeight="semibold" letterSpacing="wider">
              Serviço {' - '}
              <Text
                as="span"
                color={{ base: 'primary.700', _dark: 'primary.200' }}
                fontWeight="light"
                letterSpacing="tight"
              >
                {serviceEstablishment.name}
              </Text>
            </Header.Title>

            <Separator
              orientation="vertical"
              h="6"
              borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
            />

            <StatusServiceEstablishment
              status={serviceEstablishment.status}
              color="color"
            />
          </HStack>
        </HStack>
      </Header.Root>

      <ServiceEstablishmentDetails />
    </Box>
  )
}
