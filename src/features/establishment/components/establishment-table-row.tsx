import {
  Avatar,
  Badge,
  HStack,
  Icon,
  IconButton,
  Progress,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  PencilLineIcon,
} from 'lucide-react'

import { Tooltip } from '@/components/ui/tooltip'
import { formattedPhone } from '@/shared/utils/formatted-mask'
import { tableRowsCss } from '@/theme/styles/global-styles'

import { useEstablishmentTableRow } from '../hooks/use-establishment-table-row'
import type { EstablishmentOrganizationProfileApiResponse } from '../types/get-establishment-api.response.type'

interface EstablishmentTableRowProps {
  establishment: EstablishmentOrganizationProfileApiResponse
  establishmentDetailsId: string
  isEstablishmentExpanded: boolean
  onToggleEstablishmentDetails: (establishmentId: string) => void
}

export default function EstablishmentTableRow({
  establishment,
  establishmentDetailsId,
  isEstablishmentExpanded,
  onToggleEstablishmentDetails,
}: EstablishmentTableRowProps) {
  const {
    establishmentImageUrl,
    establishmentStatus,
    isEstablishmentOpen,
    openingHours,
    establishmentFirstPhone,
    establishmentRatingPercentage,
  } = useEstablishmentTableRow(establishment)

  return (
    <Table.Row {...tableRowsCss}>
      <Table.Cell>
        <IconButton
          size="xs"
          variant="ghost"
          rounded="lg"
          aria-expanded={isEstablishmentExpanded}
          aria-controls={establishmentDetailsId}
          aria-label={`${isEstablishmentExpanded ? 'Ocultar' : 'Exibir'} detalhes de ${establishment.name}`}
          onClick={() => onToggleEstablishmentDetails(establishment.id)}
        >
          <Icon
            as={isEstablishmentExpanded ? ChevronDownIcon : ChevronRightIcon}
          />
        </IconButton>
      </Table.Cell>

      <Table.Cell>
        <HStack gap="3">
          <Avatar.Root size="sm" shape="rounded" colorPalette="primary">
            {establishmentImageUrl && (
              <Avatar.Image src={establishmentImageUrl} alt="" />
            )}
            <Avatar.Fallback name={establishment.name} />
          </Avatar.Root>
          <Stack gap="0" minW="0">
            <Text fontWeight="medium" lineClamp={1}>
              {establishment.name}
            </Text>
            <Text
              fontSize="xs"
              color={{ _light: 'gray.600', _dark: 'gray.400' }}
              lineClamp={1}
            >
              /{establishment.slug}
            </Text>
          </Stack>
        </HStack>
      </Table.Cell>

      <Table.Cell>
        <Stack gap="0">
          <Text fontSize="sm">{establishment.email}</Text>
          <Text fontSize="xs" color={{ _light: 'gray.600', _dark: 'gray.400' }}>
            {establishmentFirstPhone
              ? formattedPhone(establishmentFirstPhone)
              : 'Sem telefone'}
          </Text>
        </Stack>
      </Table.Cell>

      <Table.Cell>
        <Stack gap="1" align="start">
          <Badge
            size="sm"
            rounded="xl"
            colorPalette={isEstablishmentOpen ? 'green' : 'red'}
          >
            {isEstablishmentOpen ? 'Aberto' : 'Fechado'}
          </Badge>
          <Text fontSize="xs" color={{ _light: 'gray.600', _dark: 'gray.400' }}>
            {openingHours}
          </Text>
        </Stack>
      </Table.Cell>

      <Table.Cell>
        <Badge size="sm" rounded="sm" colorPalette={establishmentStatus.color}>
          {establishmentStatus.label}
        </Badge>
      </Table.Cell>

      <Table.Cell minW="44">
        <Progress.Root
          size="sm"
          colorPalette="primary"
          value={establishmentRatingPercentage}
          aria-label={`Avaliação média de ${establishment.name}`}
        >
          <HStack gap="3">
            <Progress.Track flex="1" rounded="full">
              <Progress.Range />
            </Progress.Track>
            <Progress.ValueText fontSize="xs" whiteSpace="nowrap">
              {`${establishment.averageRating.toFixed(1)} (${establishment.totalReviews})`}
            </Progress.ValueText>
          </HStack>
        </Progress.Root>
      </Table.Cell>

      <Table.Cell textAlign="right">
        <HStack gap="1" justify="flex-end">
          <Tooltip content="Editar estabelecimento" showArrow>
            <IconButton
              asChild
              size="xs"
              variant="ghost"
              rounded="lg"
              colorPalette="emerald"
              aria-label={`Editar ${establishment.name}`}
            >
              <Link
                to="/establishment/$establishmentSlug"
                params={{ establishmentSlug: establishment.slug }}
                search={{ tab: 'edit' }}
              >
                <Icon as={PencilLineIcon} />
              </Link>
            </IconButton>
          </Tooltip>

          <Tooltip content="Ir para estabelecimento" showArrow>
            <IconButton
              asChild
              size="xs"
              variant="ghost"
              rounded="lg"
              colorPalette="emerald"
              aria-label={`Ir para ${establishment.name}`}
            >
              <Link
                to="/dashboard/$slug/overview"
                params={{ slug: establishment.slug }}
              >
                <Icon as={ExternalLinkIcon} />
              </Link>
            </IconButton>
          </Tooltip>
        </HStack>
      </Table.Cell>
    </Table.Row>
  )
}
