import { DataList, For } from '@chakra-ui/react'

import { formattedZipCode } from '@/shared/utils/formatted-mask'

import type { AddressSummaryApiResponse } from '../types/address-response.api.type'

interface AddressSummaryProps {
  address: AddressSummaryApiResponse
}

const AddressSummary = ({ address }: AddressSummaryProps) => {
  return (
    <DataList.Root orientation="horizontal" gap="3" minW="0">
      <For
        each={[
          {
            label: 'CEP',
            value: formattedZipCode(address.postalCode),
          },
          { label: 'Logradouro', value: address.street },
          { label: 'Número', value: address.number },
          { label: 'Complemento', value: address.complement || '--' },
          { label: 'Bairro', value: address.neighborhood },
          { label: 'Cidade', value: address.city },
          { label: 'Estado', value: address.state },
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
  )
}

export default AddressSummary
