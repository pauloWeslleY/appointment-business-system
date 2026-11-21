import {
  Avatar,
  Badge,
  Box,
  Card,
  DataList,
  Flex,
  For,
  Grid,
  GridItem,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LinkIcon, StarIcon } from 'lucide-react'

import { cardCss } from '@/theme/styles/global-styles'

import { useEstablishmentTableRowDetails } from '../hooks/use-establishment-table-row-details'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'
import EstablishmentDetailsSection from './establishment-details-section'

interface EstablishmentTableRowDetailsProps {
  establishment: EstablishmentOrganizationProfileApiResponse
}

const establishmentSectionBorderColor = {
  _light: 'gray.200',
  _dark: 'secondary.500/20',
}

const establishmentMutedTextColor = {
  _light: 'gray.600',
  _dark: 'gray.400',
}

export default function EstablishmentTableRowDetails({
  establishment,
}: EstablishmentTableRowDetailsProps) {
  const {
    establishmentImageUrl,
    establishmentStatus,
    establishmentOpeningHoursByDay,
    establishmentTodayLabel,
    establishmentContacts,
    establishmentStats,
    establishmentGeneralDetails,
    establishmentAppointments,
    establishmentWebsiteUrl,
  } = useEstablishmentTableRowDetails(establishment)

  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '20rem 1fr' }}
      gap="4"
      p={{ base: '2', md: '4' }}
    >
      <GridItem minW="0">
        <Card.Root variant="outline" position="relative" h="fit" css={cardCss}>
          <Badge
            position="absolute"
            top="3"
            right="3"
            size="sm"
            rounded="md"
            variant="solid"
            colorPalette={establishmentStatus.color}
          >
            {establishmentStatus.label}
          </Badge>

          <Card.Body gap="4" p="4">
            <Stack align="center" gap="2" textAlign="center">
              <Avatar.Root size="xl" colorPalette="primary">
                {establishmentImageUrl && (
                  <Avatar.Image
                    src={establishmentImageUrl}
                    alt={establishment.name}
                  />
                )}
                <Avatar.Fallback name={establishment.name} />
              </Avatar.Root>

              <Box>
                <Text fontWeight="medium">{establishment.name}</Text>
                <Text fontSize="sm" color={establishmentMutedTextColor}>
                  /{establishment.slug}
                </Text>
              </Box>

              <HStack gap="1" fontSize="sm">
                <Icon as={StarIcon} boxSize="4" color="yellow.400" />
                <Text>{establishment.averageRating.toFixed(1)}</Text>
              </HStack>
            </Stack>

            <SimpleGrid
              columns={3}
              gap="3"
              py="4"
              borderYWidth="1px"
              borderColor={establishmentSectionBorderColor}
              textAlign="center"
            >
              <For each={establishmentStats}>
                {(establishmentStat) => (
                  <Box key={establishmentStat.label} minW="0">
                    <Text
                      fontSize="xs"
                      color={establishmentMutedTextColor}
                      truncate
                    >
                      {establishmentStat.label}
                    </Text>
                    <Text fontWeight="semibold" fontSize="lg">
                      {establishmentStat.value}
                    </Text>
                  </Box>
                )}
              </For>
            </SimpleGrid>

            <Stack gap="3">
              <For each={establishmentContacts}>
                {(establishmentContact) => (
                  <Flex
                    key={establishmentContact.label}
                    align="center"
                    justify="space-between"
                    gap="4"
                  >
                    <Icon
                      as={establishmentContact.icon}
                      boxSize="4"
                      flexShrink="0"
                      color={establishmentMutedTextColor}
                      aria-label={establishmentContact.label}
                    />
                    <Text fontSize="sm" textAlign="right" minW="0">
                      {establishmentContact.value}
                    </Text>
                  </Flex>
                )}
              </For>

              {establishmentWebsiteUrl && (
                <Flex align="center" justify="space-between" gap="4">
                  <Icon
                    as={LinkIcon}
                    boxSize="4"
                    flexShrink="0"
                    color={establishmentMutedTextColor}
                    aria-label="Site"
                  />
                  <Link
                    href={establishmentWebsiteUrl}
                    title={establishmentWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    fontSize="sm"
                    minW="0"
                    display="block"
                    truncate
                    color={{ _light: 'primary.600', _dark: 'primary.200' }}
                  >
                    {establishmentWebsiteUrl}
                  </Link>
                </Flex>
              )}
            </Stack>
          </Card.Body>
        </Card.Root>
      </GridItem>

      <GridItem minW="0">
        <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }} gap="4">
          <GridItem colSpan={{ base: 1, xl: 2 }}>
            <EstablishmentDetailsSection title="Detalhes do estabelecimento">
              <DataList.Root
                orientation="vertical"
                display="grid"
                gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                gap="4"
              >
                <For each={establishmentGeneralDetails}>
                  {(establishmentGeneralDetail) => (
                    <DataList.Item key={establishmentGeneralDetail.label}>
                      <DataList.ItemLabel>
                        {establishmentGeneralDetail.label}
                      </DataList.ItemLabel>
                      <DataList.ItemValue>
                        {establishmentGeneralDetail.value}
                      </DataList.ItemValue>
                    </DataList.Item>
                  )}
                </For>
              </DataList.Root>
            </EstablishmentDetailsSection>
          </GridItem>

          <GridItem>
            <EstablishmentDetailsSection title="Agendamentos">
              <DataList.Root orientation="horizontal">
                <For each={establishmentAppointments}>
                  {(establishmentAppointment) => (
                    <DataList.Item key={establishmentAppointment.label}>
                      <DataList.ItemLabel>
                        {establishmentAppointment.label}
                      </DataList.ItemLabel>
                      <DataList.ItemValue>
                        {establishmentAppointment.value}
                      </DataList.ItemValue>
                    </DataList.Item>
                  )}
                </For>
              </DataList.Root>
              <Text fontSize="xs" color={establishmentMutedTextColor}>
                Horários no fuso {establishment.timezone}
              </Text>
            </EstablishmentDetailsSection>
          </GridItem>

          <GridItem>
            <EstablishmentDetailsSection title="Horário de funcionamento">
              {establishmentOpeningHoursByDay.length === 0 && (
                <Text fontSize="sm" color={establishmentMutedTextColor}>
                  Sem horário de funcionamento cadastrado.
                </Text>
              )}

              {establishmentOpeningHoursByDay.length > 0 && (
                <DataList.Root orientation="horizontal" gap="2">
                  <For each={establishmentOpeningHoursByDay}>
                    {(establishmentOpeningHour) => {
                      const isEstablishmentToday =
                        establishmentOpeningHour.day === establishmentTodayLabel

                      return (
                        <DataList.Item key={establishmentOpeningHour.day}>
                          <DataList.ItemLabel
                            fontWeight={
                              isEstablishmentToday ? 'semibold' : 'normal'
                            }
                          >
                            {establishmentOpeningHour.day}
                            {isEstablishmentToday && (
                              <Badge
                                ms="2"
                                size="xs"
                                rounded="sm"
                                colorPalette="primary"
                              >
                                Hoje
                              </Badge>
                            )}
                          </DataList.ItemLabel>
                          <DataList.ItemValue>
                            {establishmentOpeningHour.intervals}
                          </DataList.ItemValue>
                        </DataList.Item>
                      )
                    }}
                  </For>
                </DataList.Root>
              )}
            </EstablishmentDetailsSection>
          </GridItem>

          <GridItem colSpan={{ base: 1, xl: 2 }}>
            <EstablishmentDetailsSection title="Sobre">
              <Text fontSize="sm" color={establishmentMutedTextColor}>
                {establishment.description || 'Sem descrição cadastrada.'}
              </Text>
            </EstablishmentDetailsSection>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  )
}
