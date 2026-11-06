import { Badge, Card, DataList, For, Text } from '@chakra-ui/react'

import { Status } from '@/components/ui/status'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { mapStatusUserAuthenticated } from '@/shared/helpers/status-user-authenticated'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { cardSectionCss } from '@/theme/styles/global-styles'

// const verifiedTitle = () => new Set(['E-mail verificado', 'Status'])

const AdditionalInformationUser = () => {
  const { data } = useAppSession()
  const emailVerified = data?.user?.emailVerified ?? false
  const statusUserAuth = mapStatusUserAuthenticated(
    data?.user?.status ?? undefined,
  )

  return (
    <Card.Root variant="outline" css={cardSectionCss} h="fit">
      <Text fontSize="lg" fontWeight="bold">
        Informações adicionais
      </Text>

      <DataList.Root
        mt="4"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(min(400px, 100%), 1fr))"
        gap="4"
      >
        <For
          each={[
            {
              label: 'E-mail verificado',
              value: emailVerified ? 'Sim' : 'Não',
              renderComponent: true,
            },
            {
              label: 'Status',
              value: statusUserAuth.label,
              renderComponent: true,
            },
            {
              label: 'Último login',
              value: formattedDateAndHours(
                data?.user?.lastLoginAt ?? null,
                true,
              ),
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
          {(info) => {
            return (
              <DataList.Item key={info.label}>
                <DataList.ItemLabel>{info.label}</DataList.ItemLabel>
                <DataList.ItemValue>
                  {info.label === 'E-mail verificado' && (
                    <Status value={emailVerified ? 'success' : 'error'}>
                      {emailVerified ? 'Sim' : 'Não'}
                    </Status>
                  )}

                  {info.label === 'Status' && (
                    <Badge
                      variant="surface"
                      colorPalette={statusUserAuth.color}
                    >
                      {info.value}
                    </Badge>
                  )}

                  {!info.renderComponent && info.value}
                </DataList.ItemValue>
              </DataList.Item>
            )
          }}
        </For>
      </DataList.Root>
    </Card.Root>
  )
}

export default AdditionalInformationUser
