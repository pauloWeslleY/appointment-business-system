import {
  Badge,
  Box,
  DataList,
  defineStyle,
  For,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'

import { openingHoursEstablishmentMapper } from '../helpers/opening-hours-establishment-mapper'
import {
  establishmentAddressFormatted,
  establishmentPhonesFormatted,
} from '../helpers/summary-establishment.mapper'
import { mapStatusEstablishment } from '../types/establishment-status.type'

const establishmentRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

const cssSectionSummaryEstablishment = defineStyle({
  borderWidth: '1px',
  borderColor: { base: 'gray.200', _dark: 'secondary.500/20' },
  rounded: 'lg',
  p: '4',
})

const SummaryEstablishment = () => {
  const { establishment } = establishmentRoute.useLoaderData()
  const statusEstablishment = mapStatusEstablishment(establishment.status)
  const openingHoursByDay = openingHoursEstablishmentMapper(
    establishment.openingHours,
  )

  return (
    <Box spaceY="4">
      <Text>Dados gerais do estabelecimento</Text>

      <DataList.Root
        orientation="horizontal"
        css={cssSectionSummaryEstablishment}
      >
        <For
          each={[
            {
              label: 'Nome',
              value: establishment.name,
            },
            {
              label: 'Descrição',
              value: establishment.description,
            },
            {
              label: 'Pagamento (Sinal)',
              value: establishment.requiresBookingDeposit
                ? 'Habilitado'
                : 'Desabilitado',
            },
            {
              label: 'Status',
              value: establishment.status,
            },
            {
              label: 'Telefone',
              value: establishmentPhonesFormatted(establishment.phones),
            },
            {
              label: 'Endereço',
              value: establishmentAddressFormatted(establishment),
            },
          ]}
        >
          {(item) => {
            return (
              <DataList.Item key={item.label}>
                <DataList.ItemLabel>{item.label}</DataList.ItemLabel>

                {item.label === 'Status' && (
                  <DataList.ItemValue>
                    <Badge
                      size="sm"
                      rounded="lg"
                      variant="surface"
                      colorPalette={statusEstablishment.color}
                    >
                      {statusEstablishment.label}
                    </Badge>
                  </DataList.ItemValue>
                )}

                {item.label !== 'Status' && (
                  <DataList.ItemValue>{item.value}</DataList.ItemValue>
                )}
              </DataList.Item>
            )
          }}
        </For>
      </DataList.Root>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <Box spaceY="4" css={cssSectionSummaryEstablishment}>
          <Text>Redes sociais</Text>

          <DataList.Root orientation="horizontal">
            <For
              each={[
                {
                  label: 'Instagram',
                  value: establishment.instagram || 'N/A',
                },
                {
                  label: 'Facebook',
                  value: establishment.facebook || 'N/A',
                },
                {
                  label: 'Whatsapp',
                  value: establishment.whatsapp || 'N/A',
                },
              ]}
            >
              {(item) => {
                return (
                  <DataList.Item key={item.label}>
                    <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                    <DataList.ItemValue>{item.value}</DataList.ItemValue>
                  </DataList.Item>
                )
              }}
            </For>
          </DataList.Root>
        </Box>

        <Box spaceY="4" css={cssSectionSummaryEstablishment}>
          <Text>Links</Text>

          <DataList.Root orientation="horizontal">
            <For
              each={[
                {
                  label: 'Link de Pagamento',
                  value: establishment.paymentLink || 'N/A',
                },
                {
                  label: 'QR Code de Pagamento',
                  value: establishment.paymentQrCodeUrl || 'N/A',
                },
              ]}
            >
              {(item) => {
                return (
                  <DataList.Item key={item.label}>
                    <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                    <DataList.ItemValue>{item.value}</DataList.ItemValue>
                  </DataList.Item>
                )
              }}
            </For>
          </DataList.Root>
        </Box>
      </SimpleGrid>

      <Stack css={cssSectionSummaryEstablishment} gap="4">
        <Text>Horário de Funcionamento</Text>

        {openingHoursByDay.length === 0 && (
          <Text fontSize="sm" color="gray.500">
            Sem horários disponíveis
          </Text>
        )}

        {openingHoursByDay.length > 0 && (
          <DataList.Root orientation="horizontal">
            <For each={openingHoursByDay}>
              {(item) => (
                <DataList.Item key={item.day}>
                  <DataList.ItemLabel>{item.day}</DataList.ItemLabel>
                  <DataList.ItemValue>{item.intervals}</DataList.ItemValue>
                </DataList.Item>
              )}
            </For>
          </DataList.Root>
        )}
      </Stack>
    </Box>
  )
}

export default SummaryEstablishment
