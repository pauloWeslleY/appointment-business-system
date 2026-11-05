import {
  Badge,
  Button,
  CloseButton,
  DataList,
  defineStyle,
  Drawer,
  Flex,
  For,
  HStack,
  Icon,
  IconButton,
  Portal,
  Separator,
  Stack,
  Stat,
  Text,
} from '@chakra-ui/react'
import { Info, StarIcon } from 'lucide-react'
import { useState } from 'react'

import { Status } from '@/components/ui/status'
import { Tooltip } from '@/components/ui/tooltip'
import { weekDaysLabels } from '@/shared/utils/create-list-weekdays'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { formattedPhone } from '@/shared/utils/formatted-mask'
import { contentCss } from '@/theme/styles/global-styles'

import {
  type EstablishmentStatusType,
  mapStatusEstablishment,
} from '../types/establishment-status.type'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'

const CUSTOM_RENDERED_LABELS = new Set(['Horário de funcionamento', 'Status'])

interface SidebarInfoEstablishmentProps {
  establishment: EstablishmentOrganizationProfileApiResponse
  establishmentOpen: boolean
}

const styleSidebarInfoCss = defineStyle({
  borderWidth: '1px',
  borderColor: { base: 'gray.200', _dark: 'secondary.500/20' },
  rounded: 'lg',
  shadow: 'xs',
  p: '2',
  bg: { base: 'gray.50', _dark: 'gray.900/50' },
})

const SidebarInfoEstablishment = ({
  establishment,
  establishmentOpen,
}: SidebarInfoEstablishmentProps) => {
  const [sidebarEstablishmentOpen, setSidebarEstablishmentOpen] =
    useState(false)

  const nextAppointmentAt = formattedDateAndHours(
    establishment.nextAppointmentAt,
    true,
  )

  const openingHoursByDay = establishment.openingHours.map((item) => ({
    day: weekDaysLabels[item.day],
    intervals: item.intervals
      .map((interval) => `${interval.open} - ${interval.close}`)
      .join(', '),
  }))

  function hasCustomRendering(label: string) {
    return CUSTOM_RENDERED_LABELS.has(label)
  }

  return (
    <>
      <Tooltip content="Mais informações" showArrow>
        <IconButton
          size="xs"
          variant="ghost"
          rounded="full"
          onClick={() => setSidebarEstablishmentOpen(true)}
        >
          <Info />
        </IconButton>
      </Tooltip>

      <Drawer.Root
        size="lg"
        open={sidebarEstablishmentOpen}
        onOpenChange={(e) => setSidebarEstablishmentOpen(e.open)}
      >
        <Portal>
          <Drawer.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
          <Drawer.Positioner>
            <Drawer.Content css={contentCss} minW="0">
              <Drawer.Header>
                <Drawer.Title>Informações do estabelecimento</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body spaceY="4">
                <DataList.Root orientation="vertical" css={styleSidebarInfoCss}>
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
                        label: 'Horário de funcionamento',
                        value: establishmentOpen ? 'Aberto' : 'Fechado',
                      },
                      {
                        label: 'Status',
                        value: establishment.status,
                      },
                      {
                        label: 'Telefone',
                        value: establishment.phones
                          .map(formattedPhone)
                          .join(' - '),
                      },
                      {
                        label: 'Endereço',
                        value: `
                          ${establishment.address.street}, 
                          ${establishment.address.number} - 
                          ${establishment.address.neighborhood}, 
                          ${establishment.address.city} - 
                          ${establishment.address.state}
                        `,
                      },
                    ]}
                  >
                    {(item) => {
                      const isCustomRenderedLabel = hasCustomRendering(
                        item.label,
                      )

                      return (
                        <DataList.Item key={item.label}>
                          <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                          {item.label === 'Horário de funcionamento' && (
                            <Status
                              value={establishmentOpen ? 'success' : 'error'}
                            >
                              {item.value}
                            </Status>
                          )}

                          {item.label === 'Status' && (
                            <DataList.ItemValue>
                              <Badge
                                size="sm"
                                rounded="lg"
                                variant="surface"
                                colorPalette={
                                  mapStatusEstablishment(
                                    item.value as EstablishmentStatusType,
                                  ).color
                                }
                              >
                                {
                                  mapStatusEstablishment(
                                    item.value as EstablishmentStatusType,
                                  ).label
                                }
                              </Badge>
                            </DataList.ItemValue>
                          )}

                          {!isCustomRenderedLabel && (
                            <DataList.ItemValue>
                              {item.value}
                            </DataList.ItemValue>
                          )}
                        </DataList.Item>
                      )
                    }}
                  </For>
                </DataList.Root>

                <Separator
                  orientation="horizontal"
                  borderColor={{
                    _light: 'gray.200',
                    _dark: 'secondary.500/20',
                  }}
                />

                <HStack
                  aria-label="Establishment Stats"
                  align="center"
                  flexWrap="wrap"
                  css={styleSidebarInfoCss}
                >
                  <Stat.Root>
                    <Stat.Label>Total de serviços</Stat.Label>
                    <Stat.ValueText>
                      {establishment.totalServices}
                    </Stat.ValueText>
                  </Stat.Root>

                  <Separator
                    orientation="vertical"
                    height="14"
                    borderColor={{
                      _light: 'gray.200',
                      _dark: 'secondary.500/20',
                    }}
                  />

                  <Stat.Root>
                    <Stat.Label>Total de colaboradores</Stat.Label>
                    <Stat.ValueText>
                      {establishment.totalCollaborators}
                    </Stat.ValueText>
                  </Stat.Root>

                  <Separator
                    orientation="vertical"
                    height="14"
                    borderColor={{
                      _light: 'gray.200',
                      _dark: 'secondary.500/20',
                    }}
                  />

                  <Stat.Root>
                    <Stat.Label>Media de avaliações</Stat.Label>
                    <Stat.ValueText gap="2" alignItems="center">
                      <HStack align="center" gap="1">
                        <Text lineHeight="0" fontSize="sm" letterSpacing="wide">
                          {establishment.averageRating.toFixed(1)}
                        </Text>

                        <Icon as={StarIcon} boxSize="4" color="yellow.400" />
                      </HStack>

                      {' - '}

                      <Text lineHeight="0" fontSize="sm" letterSpacing="wide">
                        {establishment.totalReviews} avaliações
                      </Text>
                    </Stat.ValueText>
                  </Stat.Root>
                </HStack>

                <Separator
                  orientation="horizontal"
                  borderColor={{
                    _light: 'gray.200',
                    _dark: 'secondary.500/20',
                  }}
                />

                <Flex flexDir="column" gap="4" css={styleSidebarInfoCss}>
                  <Text>Agendamentos</Text>

                  <HStack>
                    <Stat.Root>
                      <Stat.Label>Hoje</Stat.Label>
                      <Stat.ValueText>
                        {establishment.todayAppointmentsTotal}
                      </Stat.ValueText>
                    </Stat.Root>

                    <Separator
                      orientation="vertical"
                      height="14"
                      borderColor={{
                        _light: 'gray.200',
                        _dark: 'secondary.500/20',
                      }}
                    />

                    <Stat.Root>
                      <Stat.Label>Próximo</Stat.Label>
                      <Stat.ValueText>{nextAppointmentAt}</Stat.ValueText>
                    </Stat.Root>
                  </HStack>
                </Flex>

                <Separator
                  orientation="horizontal"
                  borderColor={{
                    _light: 'gray.200',
                    _dark: 'secondary.500/20',
                  }}
                />

                <Stack css={styleSidebarInfoCss} gap="4">
                  <Text>Horário de Funcionamento</Text>

                  <DataList.Root orientation="horizontal">
                    <For each={openingHoursByDay}>
                      {(item) => (
                        <DataList.Item key={item.day}>
                          <DataList.ItemLabel>{item.day}</DataList.ItemLabel>
                          <DataList.ItemValue>
                            {item.intervals}
                          </DataList.ItemValue>
                        </DataList.Item>
                      )}
                    </For>
                  </DataList.Root>
                </Stack>
              </Drawer.Body>
              <Drawer.Footer flexWrap="wrap" gap="2">
                <Drawer.ActionTrigger asChild>
                  <Button
                    variant="surface"
                    rounded="lg"
                    size="sm"
                    colorPalette="red"
                  >
                    Fechar
                  </Button>
                </Drawer.ActionTrigger>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" rounded="full" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  )
}

export default SidebarInfoEstablishment
