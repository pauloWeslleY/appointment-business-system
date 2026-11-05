import { Badge, Card, DataList, For, Text } from '@chakra-ui/react'

import { authClient } from '@/lib/auth'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { cardSectionCss } from '@/theme/styles/global-styles'

const AdditionalInformationUser = () => {
  const { data } = authClient.useSession()

  return (
    <Card.Root variant="outline" css={cardSectionCss} h="fit">
      <Text fontSize="lg" fontWeight="bold">
        Informações adicionais
      </Text>

      <DataList.Root
        mt="4"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(min(100%, 200px), 1fr))"
        gap="4"
      >
        <For
          each={[
            {
              label: 'E-mail verificado',
              value: data?.user?.emailVerified ?? false,
            },
            {
              label: 'Data da criação da conta',
              value: formattedDateAndHours(data?.user?.createdAt ?? null, true),
            },
            {
              label: 'Data da última atualização da conta',
              value: formattedDateAndHours(data?.user?.updatedAt ?? null, true),
            },
          ]}
        >
          {(info) => (
            <DataList.Item key={info.label}>
              <DataList.ItemLabel>{info.label}</DataList.ItemLabel>
              <DataList.ItemValue>
                {typeof info.value === 'boolean' ? (
                  <Badge
                    variant="surface"
                    colorPalette={info.value ? 'green' : 'red'}
                  >
                    {info.value ? 'Sim' : 'Não'}
                  </Badge>
                ) : (
                  info.value
                )}
              </DataList.ItemValue>
            </DataList.Item>
          )}
        </For>
      </DataList.Root>
    </Card.Root>
  )
}

export default AdditionalInformationUser
