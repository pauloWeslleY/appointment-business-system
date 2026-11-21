import {
  Alert,
  Button,
  chakra,
  Fieldset,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Save } from 'lucide-react'
import { FormProvider } from 'react-hook-form'

import type { GetMeContextResponse } from '@/features/members/types/member-response.type'
import { skeletonCss } from '@/theme/styles/global-styles'

import EstablishmentPaymentFields from '../components/establishment-payment-fields'
import EstablishmentSocialLinksFields from '../components/establishment-social-links-fields'
import { useFormEstablishmentLinks } from '../hooks/use-form-establishment-links'

interface EstablishmentLinksSettingsPageProps {
  establishmentSlug: string
  memberContext: GetMeContextResponse
}

export default function EstablishmentLinksSettingsPage({
  establishmentSlug,
  memberContext,
}: EstablishmentLinksSettingsPageProps) {
  const {
    establishmentLinksQuery,
    formEstablishmentLinks,
    establishmentLinksScopeIdentity,
    canUpdateEstablishmentLinks,
    isPendingSaveEstablishmentLinks,
    isEstablishmentLinksFormDirty,
    isEstablishmentLinksFieldsetDisabled,
    isSaveEstablishmentLinksDisabled,
    handleSaveEstablishmentLinks,
    handleDiscardEstablishmentLinks,
    retryEstablishmentLinks,
  } = useFormEstablishmentLinks(establishmentSlug, memberContext)

  if (establishmentLinksQuery.isPending) {
    return (
      <Stack role="status" aria-label="Carregando links">
        <Skeleton h="12" css={skeletonCss} />
        <Skeleton h="32" css={skeletonCss} />
        <Skeleton h="32" css={skeletonCss} />
      </Stack>
    )
  }

  if (establishmentLinksQuery.error) {
    return (
      <Alert.Root status="error" variant="surface" rounded="lg">
        <Alert.Indicator />
        <Stack>
          <Alert.Title>Não foi possível carregar os links.</Alert.Title>
          <Alert.Description>
            {establishmentLinksQuery.error.message}
          </Alert.Description>
          <Button
            rounded="lg"
            type="button"
            size="sm"
            variant="outline"
            onClick={retryEstablishmentLinks}
          >
            Tentar novamente
          </Button>
        </Stack>
      </Alert.Root>
    )
  }

  if (!establishmentLinksQuery.data) {
    return (
      <Alert.Root status="info" variant="surface" rounded="lg">
        <Alert.Indicator />
        <Alert.Title>Selecione um estabelecimento para configurar.</Alert.Title>
      </Alert.Root>
    )
  }

  return (
    <FormProvider {...formEstablishmentLinks}>
      <chakra.form w="full" onSubmit={handleSaveEstablishmentLinks} noValidate>
        {!canUpdateEstablishmentLinks && (
          <Alert.Root status="info" variant="surface" rounded="lg" mb="4">
            <Alert.Indicator />
            <Alert.Title>
              Seu acesso permite consultar estes links. Alterações exigem
              permissão de edição do estabelecimento.
            </Alert.Title>
          </Alert.Root>
        )}

        <Fieldset.Root disabled={isEstablishmentLinksFieldsetDisabled}>
          <Fieldset.Content gap="6">
            <EstablishmentSocialLinksFields />

            <EstablishmentPaymentFields
              scopeIdentity={establishmentLinksScopeIdentity}
              isSaving={isPendingSaveEstablishmentLinks}
            />

            <Text fontSize="sm">
              Os links são salvos apenas para{' '}
              {establishmentLinksQuery.data.name}.
            </Text>

            <HStack justify="end" flexWrap="wrap" gap="3">
              <Button
                type="button"
                variant="ghost"
                colorPalette="red"
                size="sm"
                rounded="lg"
                alignSelf="start"
                disabled={!isEstablishmentLinksFormDirty}
                onClick={handleDiscardEstablishmentLinks}
              >
                Descartar alterações
              </Button>

              <Button
                type="submit"
                size="sm"
                rounded="lg"
                alignSelf="start"
                colorPalette="brand"
                loading={isPendingSaveEstablishmentLinks}
                loadingText="Salvando links"
                disabled={isSaveEstablishmentLinksDisabled}
              >
                <Icon as={Save} boxSize="5" />
                Salvar links
              </Button>
            </HStack>
          </Fieldset.Content>
        </Fieldset.Root>
      </chakra.form>
    </FormProvider>
  )
}
