import {
  Badge,
  Button,
  CloseButton,
  DataList,
  defineStyle,
  Drawer,
  Flex,
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

import { Tooltip } from '@/components/ui/tooltip'
import { weekDaysLabels } from '@/shared/utils/create-list-weekdays'
import { formattedPhone } from '@/shared/utils/formatted-mask'
import { contentCss } from '@/theme/styles/global-styles'

import type { EstablishmentModel } from '../types/establishment.model'

interface SidebarInfoEstablishmentProps {
  establishment: EstablishmentModel
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

  const addressEstablishment = `
    ${establishment.address.street}, 
    ${establishment.address.number} - 
    ${establishment.address.neighborhood}, 
    ${establishment.address.city} - 
    ${establishment.address.state}
  `

  const establishmentDataList = [
    {
      label: 'Nome',
      value: establishment.name,
    },
    {
      label: 'Descrição',
      value: establishment.description,
    },
    {
      label: 'Status',
      value: establishmentOpen ? 'Aberto' : 'Fechado',
    },
    {
      label: 'Telefone',
      value: establishment.phones.map(formattedPhone).join(' - '),
    },
    {
      label: 'Endereço',
      value: addressEstablishment,
    },
  ]

  const getEstablishmentOpeningHours = establishment.openingHours.map(
    (item) => ({
      day: weekDaysLabels[item.day],
      intervals: item.intervals
        .map((interval) => `${interval.open} - ${interval.close}`)
        .join(', '),
    }),
  )

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
            <Drawer.Content css={contentCss}>
              <Drawer.Header>
                <Drawer.Title>Informações do estabelecimento</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body spaceY="4">
                <DataList.Root orientation="vertical" css={styleSidebarInfoCss}>
                  {establishmentDataList.map((item) => (
                    <DataList.Item key={item.label}>
                      <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                      {item.label === 'Status' ? (
                        <DataList.ItemValue>
                          <Badge
                            size="sm"
                            colorPalette={establishmentOpen ? 'green' : 'red'}
                          >
                            {item.value}
                          </Badge>
                        </DataList.ItemValue>
                      ) : (
                        <DataList.ItemValue>{item.value}</DataList.ItemValue>
                      )}
                    </DataList.Item>
                  ))}
                </DataList.Root>

                <Separator
                  orientation="horizontal"
                  borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
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
                      base: 'gray.200',
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
                      base: 'gray.200',
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
                        {establishment.totalRatings} avaliações
                      </Text>
                    </Stat.ValueText>
                  </Stat.Root>
                </HStack>

                <Separator
                  orientation="horizontal"
                  borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
                />

                <Flex flexDir="column" gap="4" css={styleSidebarInfoCss}>
                  <Text>Agendamentos</Text>

                  <HStack>
                    <Stat.Root>
                      <Stat.Label>Hoje</Stat.Label>
                      <Stat.ValueText>
                        {establishment.todayBookingsTotal}
                      </Stat.ValueText>
                    </Stat.Root>

                    <Separator
                      orientation="vertical"
                      height="14"
                      borderColor={{
                        base: 'gray.200',
                        _dark: 'secondary.500/20',
                      }}
                    />

                    <Stat.Root>
                      <Stat.Label>Próximo</Stat.Label>
                      <Stat.ValueText>
                        {establishment.nextBookingAt ?? '00:00'}
                      </Stat.ValueText>
                    </Stat.Root>
                  </HStack>
                </Flex>

                <Separator
                  orientation="horizontal"
                  borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
                />

                <Stack css={styleSidebarInfoCss} gap="4">
                  <Text>Horário de Funcionamento</Text>

                  <DataList.Root orientation="horizontal">
                    {getEstablishmentOpeningHours.map((item) => (
                      <DataList.Item key={item.day}>
                        <DataList.ItemLabel>{item.day}</DataList.ItemLabel>
                        <DataList.ItemValue>
                          {item.intervals}
                        </DataList.ItemValue>
                      </DataList.Item>
                    ))}
                  </DataList.Root>
                </Stack>
              </Drawer.Body>
              <Drawer.Footer>
                <Button
                  variant="surface"
                  rounded="xl"
                  size="sm"
                  colorPalette="red"
                >
                  Fechar
                </Button>
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
