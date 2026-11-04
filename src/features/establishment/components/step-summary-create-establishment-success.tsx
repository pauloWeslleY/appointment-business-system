import {
  Box,
  Card,
  DataList,
  defineStyle,
  For,
  Grid,
  Text,
} from '@chakra-ui/react'
import { useQueries } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'

import { getAddressByEstablishmentQueryOptions } from '@/features/address/queries/address.query-options'
import {
  mapLabelOpeningHoursIntervalsSummary,
  mapLabelWeekday,
} from '@/features/opening-hours/helpers/map-label-weekday'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { establishmentAdminSlugQueryOptions } from '../queries/establishment.query-options'

interface StepSummaryCreateEstablishmentSuccessProps {
  establishmentId: string
  slug: string
}

const titleSummaryEstablishmentCss = defineStyle({
  mb: '2',
  color: { _light: 'sea.700', _dark: 'sea.400' },
})

const StepSummaryCreateEstablishmentSuccess = ({
  establishmentId,
  slug,
}: StepSummaryCreateEstablishmentSuccessProps) => {
  const { memberContext } = useRouteContext({ from: '/_authenticated' })
  const [establishment, address] = useQueries({
    queries: [
      establishmentAdminSlugQueryOptions(slug),
      getAddressByEstablishmentQueryOptions(
        {
          organizationId: memberContext.organization.id,
          userId: memberContext.user.id,
        },
        { establishmentId },
      ),
    ],
  })

  return (
    <Box spaceY="2">
      <Grid templateColumns={{ base: '1fr', lg: '1fr 300px' }} gap="2">
        <Card.Root variant="outline" {...cardSectionCss}>
          <Text {...titleSummaryEstablishmentCss}>
            Resumo do estabelecimento
          </Text>
          <DataList.Root
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(min(400px, 100%), 1fr))"
            gap="4"
          >
            <For
              each={[
                { label: 'Nome', value: establishment?.data?.name },
                { label: 'Descrição', value: establishment?.data?.description },
                { label: 'E-mail', value: establishment?.data?.email },
                {
                  label: 'Contatos',
                  value: establishment?.data?.phones.join(', '),
                },
              ]}
            >
              {(item) => (
                <DataList.Item key={item.label}>
                  <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                  <DataList.ItemValue>{item.value}</DataList.ItemValue>
                </DataList.Item>
              )}
            </For>
          </DataList.Root>
        </Card.Root>

        <Card.Root variant="outline" {...cardSectionCss}>
          <Text {...titleSummaryEstablishmentCss}>
            Horários de funcionamento
          </Text>
          <DataList.Root>
            <For each={establishment?.data?.openingHours ?? []}>
              {(item) => (
                <DataList.Item key={item.day}>
                  <DataList.ItemLabel>
                    {mapLabelWeekday(item.day)}
                  </DataList.ItemLabel>
                  <DataList.ItemValue
                    display="flex"
                    flexDirection="column"
                    gap="1"
                  >
                    <p>
                      {
                        mapLabelOpeningHoursIntervalsSummary(item.intervals)
                          .open
                      }
                    </p>
                    <p>
                      {
                        mapLabelOpeningHoursIntervalsSummary(item.intervals)
                          .close
                      }
                    </p>
                  </DataList.ItemValue>
                </DataList.Item>
              )}
            </For>
          </DataList.Root>
        </Card.Root>
      </Grid>

      <Card.Root variant="outline" {...cardSectionCss}>
        <Text {...titleSummaryEstablishmentCss}>Endereço</Text>
        <DataList.Root
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(min(400px, 100%), 1fr))"
          gap="4"
        >
          <For
            each={[
              { label: 'Logradouro', value: address?.data?.street },
              { label: 'Número', value: address?.data?.number },
              { label: 'Bairro', value: address?.data?.neighborhood },
              { label: 'Cidade', value: address?.data?.city },
              { label: 'Estado', value: address?.data?.state },
              { label: 'CEP', value: address?.data?.postalCode },
            ]}
          >
            {(item) => (
              <DataList.Item key={item.label}>
                <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                <DataList.ItemValue>{item.value}</DataList.ItemValue>
              </DataList.Item>
            )}
          </For>
        </DataList.Root>
      </Card.Root>
    </Box>
  )
}

export default StepSummaryCreateEstablishmentSuccess
