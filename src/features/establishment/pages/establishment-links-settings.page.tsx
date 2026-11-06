import {
  Alert,
  Button,
  chakra,
  Fieldset,
  HStack,
  Icon,
  Separator,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Save } from 'lucide-react'
import { FormProvider } from 'react-hook-form'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import type { GetMeContextResponse } from '@/features/members/types/member-response.type'

import EstablishmentPaymentFields from '../components/establishment-payment-fields'
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
    query,
    form,
    scopeIdentity,
    canUpdate,
    onSubmit,
    isSaving,
    discardChanges,
  } = useFormEstablishmentLinks(establishmentSlug, memberContext)

  if (query.isPending) {
    return (
      <Stack role="status" aria-label="Carregando links">
        <Skeleton height="12" />
        <Skeleton height="32" />
        <Skeleton height="32" />
      </Stack>
    )
  }

  if (query.error) {
    return (
      <Alert.Root status="error" variant="surface" rounded="lg">
        <Alert.Indicator />
        <Stack>
          <Alert.Title>Não foi possível carregar os links.</Alert.Title>
          <Alert.Description>{query.error.message}</Alert.Description>
          <Button
            rounded="lg"
            type="button"
            size="sm"
            variant="outline"
            onClick={() => query.refetch()}
          >
            Tentar novamente
          </Button>
        </Stack>
      </Alert.Root>
    )
  }

  if (!query.data) {
    return (
      <Alert.Root status="info" variant="surface" rounded="lg">
        <Alert.Indicator />
        <Alert.Title>Selecione um estabelecimento para configurar.</Alert.Title>
      </Alert.Root>
    )
  }

  return (
    <FormProvider {...form}>
      <chakra.form w="full" onSubmit={onSubmit} noValidate>
        {!canUpdate && (
          <Alert.Root status="info" variant="surface" rounded="lg" mb="4">
            <Alert.Indicator />
            <Alert.Title>
              Seu acesso permite consultar estes links. Alterações exigem
              permissão de edição do estabelecimento.
            </Alert.Title>
          </Alert.Root>
        )}

        <Fieldset.Root disabled={!canUpdate || isSaving}>
          <Fieldset.Content gap="6">
            <Field
              label="URL da página do estabelecimento"
              invalid={Boolean(form.formState.errors.websiteUrl)}
              errorText={form.formState.errors.websiteUrl?.message}
              helperText="Opcional. Deixe em branco para remover o endereço cadastrado."
            >
              <InputField
                {...form.register('websiteUrl')}
                type="url"
                placeholder="https://seu-estabelecimento.com.br"
                autoComplete="url"
                maxLength={2048}
              />
            </Field>

            <Separator />

            <EstablishmentPaymentFields
              scopeIdentity={scopeIdentity}
              isSaving={isSaving}
            />

            <Text fontSize="sm">
              Os links são salvos apenas para {query.data.name}.
            </Text>

            <HStack justify="end" flexWrap="wrap" gap="3">
              <Button
                type="submit"
                size="sm"
                rounded="lg"
                alignSelf="start"
                colorPalette="brand"
                loading={isSaving}
                loadingText="Salvando links"
                disabled={!canUpdate || !form.formState.isDirty}
              >
                <Icon as={Save} boxSize="5" />
                Salvar links
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                rounded="lg"
                alignSelf="start"
                disabled={!form.formState.isDirty}
                onClick={discardChanges}
              >
                Descartar alterações
              </Button>
            </HStack>
          </Fieldset.Content>
        </Fieldset.Root>
      </chakra.form>
    </FormProvider>
  )
}
