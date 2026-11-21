import {
  Badge,
  Box,
  Flex,
  For,
  HStack,
  Icon,
  IconButton,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Clock2Icon, PencilIcon, TrashIcon } from 'lucide-react'

import { weekDaysLabels } from '@/shared/utils/create-list-weekdays'

import { currentDayOpeningHours } from '../helpers/calculate-current-day-opening-hours'
import { mapLabelOpeningHoursIntervals } from '../helpers/map-label-weekday'
import type { EstablishmentOpeningHoursItemApiResponse } from '../types/opening-hours-response.api.type'

interface ListOpeningHoursProps {
  openingHours: EstablishmentOpeningHoursItemApiResponse[]
  selectedOpeningHoursId: string
  onEdit: (openingHours: EstablishmentOpeningHoursItemApiResponse) => void
  onDelete: (openingHours: EstablishmentOpeningHoursItemApiResponse) => void
}

const ListOpeningHours = ({
  openingHours,
  selectedOpeningHoursId,
  onEdit,
  onDelete,
}: ListOpeningHoursProps) => {
  return (
    <Stack gap="2" role="list" aria-label="Horários de funcionamento">
      <For each={openingHours}>
        {(item) => {
          const isOpen = currentDayOpeningHours(item)
          const isSelected = item.id === selectedOpeningHoursId
          const dayLabel = weekDaysLabels[item.day]

          const renderLabelOpeningHour = () => (
            <Text fontWeight="medium">{dayLabel}</Text>
          )

          return (
            <HStack
              key={item.id}
              role="listitem"
              justify="space-between"
              gap="3"
              px="3"
              py="2"
              rounded="xl"
              borderWidth="1px"
              borderColor={
                isSelected
                  ? { _light: 'navy.300', _dark: 'navy.700' }
                  : { _light: 'gray.200', _dark: 'secondary.500/20' }
              }
              bg={
                isSelected
                  ? { _light: 'navy.100', _dark: 'navy.950/40' }
                  : 'transparent'
              }
            >
              <HStack gap="3" minW="0">
                <Flex
                  p="2"
                  rounded="lg"
                  bg={{ _light: 'primary.200/60', _dark: 'primary.500/80' }}
                >
                  <Icon
                    as={Clock2Icon}
                    boxSize="4"
                    color={{ _light: 'primary.400', _dark: 'primary.200' }}
                  />
                </Flex>

                <Box minW="0">
                  {!isOpen && renderLabelOpeningHour()}

                  {isOpen && (
                    <HStack>
                      {renderLabelOpeningHour()}

                      <Separator
                        orientation="vertical"
                        borderColor={{
                          _light: 'gray.200',
                          _dark: 'secondary.500/20',
                        }}
                        h="4"
                      />

                      <Badge
                        size="xs"
                        rounded="sm"
                        variant="surface"
                        colorPalette="green"
                      >
                        Aberto
                      </Badge>
                    </HStack>
                  )}

                  <Text fontSize="sm" color="fg.muted">
                    {mapLabelOpeningHoursIntervals(item.intervals)}
                  </Text>
                </Box>
              </HStack>

              <HStack gap="1" flexShrink="0">
                <IconButton
                  size="xs"
                  rounded="full"
                  variant="ghost"
                  aria-label={`Editar horário de ${dayLabel}`}
                  onClick={() => onEdit(item)}
                >
                  <PencilIcon />
                </IconButton>

                <IconButton
                  size="xs"
                  rounded="full"
                  variant="ghost"
                  colorPalette="red"
                  aria-label={`Excluir horário de ${dayLabel}`}
                  onClick={() => onDelete(item)}
                >
                  <TrashIcon />
                </IconButton>
              </HStack>
            </HStack>
          )
        }}
      </For>
    </Stack>
  )
}

export default ListOpeningHours
