import {
  Box,
  Card,
  EmptyState,
  Flex,
  type PaginationPageChangeDetails,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { CalendarIcon } from 'lucide-react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useTransition } from 'react'

import PaginationTable from '@/components/layout/pagination-table'
import SelectPageSize from '@/components/layout/select-page-size'
import Loader from '@/components/loader'
import { cardSectionCss } from '@/theme/styles/global-styles'

import CardAppointment from '../components/card-appointment'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

interface ListAppointmentEstablishmentProps {
  appointments: GetAppointmentByEstablishmentModel[]
  total: number
}

const CardsAppointmentsViewMode = ({
  appointments,
  total,
}: ListAppointmentEstablishmentProps) => {
  const [isPendingPagination, startTransition] = useTransition()
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(12).withOptions({
        clearOnDefault: false,
      }),
    },
    {
      shallow: true,
    },
  )
  const search = useSearch({
    from: '/_app/_authenticated/dashboard/$slug/appointment/',
  })

  const visibleAppointments = appointments

  const handlePageChange = (details: PaginationPageChangeDetails) => {
    startTransition(() => {
      setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  if (total === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <CalendarIcon />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>Sem agendamentos</EmptyState.Title>
            <EmptyState.Description>
              Não há agendamentos para o período ou filtros selecionados
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  return (
    <Card.Root variant="outline" css={cardSectionCss} w="full" spaceY="4">
      {isPendingPagination && <Loader h="28" message="Carregando dados..." />}

      {!isPendingPagination && (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="4" w="full">
          {visibleAppointments.map((appointment) => (
            <CardAppointment key={appointment.id} appointment={appointment} />
          ))}
        </SimpleGrid>
      )}

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justify="space-between"
        flexWrap="wrap"
        gap="3"
        w="full"
      >
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          align="center"
          gap="2"
          flexWrap="wrap"
        >
          <PaginationTable
            count={total}
            pageSize={pagination.page_size}
            page={pagination.page}
            onPageChange={handlePageChange}
          />

          <SelectPageSize
            shallow
            pages={[12, 24, 48]}
            search={{
              page: search.page,
              pageSize: search.page_size,
            }}
          />
        </Flex>

        <Box
          textAlign={{ base: 'center', md: 'right' }}
          mt={{ base: '2', md: '0' }}
        >
          <Text fontSize="sm" color="gray.400">
            {`Exibindo ${visibleAppointments.length} de ${total} agendamentos`}
          </Text>
        </Box>
      </Flex>
    </Card.Root>
  )
}

export default CardsAppointmentsViewMode
