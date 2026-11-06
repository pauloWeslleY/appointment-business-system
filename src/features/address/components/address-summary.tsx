import { DataList, For, HStack, IconButton } from '@chakra-ui/react'
import { PencilIcon } from 'lucide-react'

import { FormatMask, formatterMask } from '@/shared/utils/formatted-mask'

import type { AddressSummaryApiResponse } from '../types/address-response.api.type'

interface AddressSummaryProps {
  address: AddressSummaryApiResponse
  onEdit?: () => void
}

const AddressSummary = ({ address, onEdit }: AddressSummaryProps) => {
  const addressItems = [
    {
      label: 'CEP',
      value: formatterMask(address.postalCode, FormatMask.ZIP_CODE),
    },
    { label: 'Logradouro', value: address.street },
    { label: 'Número', value: address.number },
    { label: 'Complemento', value: address.complement || '--' },
    { label: 'Bairro', value: address.neighborhood },
    { label: 'Cidade', value: address.city },
    { label: 'Estado', value: address.state },
  ]

  return (
    <HStack align="start" justify="space-between" gap="3">
      <DataList.Root orientation="horizontal" gap="3" minW="0">
        <For each={addressItems}>
          {(item) => (
            <DataList.Item key={item.label}>
              <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
              <DataList.ItemValue>{item.value}</DataList.ItemValue>
            </DataList.Item>
          )}
        </For>
      </DataList.Root>

      {onEdit && (
        <IconButton
          size="xs"
          rounded="full"
          variant="ghost"
          aria-label="Editar endereço"
          onClick={onEdit}
        >
          <PencilIcon />
        </IconButton>
      )}
    </HStack>
  )
}

export default AddressSummary
