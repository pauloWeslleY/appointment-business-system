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

import type { GetMeContextResponse } from '@/features/members/types/member-response.type'

import EstablishmentColorFields from '../components/establishment-color-fields'
import { useFormEstablishmentColors } from '../hooks/use-form-establishment-colors'

interface EstablishmentColorsSettingsPageProps {
  establishmentSlug: string
  memberContext: GetMeContextResponse
}

export default function EstablishmentColorsSettingsPage({
  establishmentSlug,
  memberContext,
}: EstablishmentColorsSettingsPageProps) {
  const { query, form, values, canUpdate, onSubmit, isSaving, discardChanges } =
    useFormEstablishmentColors(establishmentSlug, memberContext)

  if (query.isPending) {
    return (
      <Stack role="status" aria-label="Carregando cores">
        <Skeleton height="12" />
        <Skeleton height="32" />
      </Stack>
    )
  }

  if (query.error) {
    return (
      <Alert.Root status="error" variant="surface" rounded="lg">
        <Alert.Indicator />
        <Stack>
          <Alert.Title>Não foi possível carregar as cores.</Alert.Title>
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
    <chakra.form w="full" onSubmit={onSubmit} noValidate>
      {!canUpdate && (
        <Alert.Root status="info" variant="surface" rounded="lg" mb="4">
          <Alert.Indicator />
          <Alert.Title>
            Seu acesso permite consultar estas cores. Alterações exigem
            permissão de edição do estabelecimento.
          </Alert.Title>
        </Alert.Root>
      )}

      <Fieldset.Root disabled={!canUpdate || isSaving}>
        <Fieldset.Content gap="6">
          <EstablishmentColorFields form={form} values={values} />

          <Text fontSize="sm">
            As cores são salvas apenas para {query.data.name}.
          </Text>

          <HStack justify="end" flexWrap="wrap" gap="3">
            <Button
              type="submit"
              size="sm"
              rounded="lg"
              alignSelf="start"
              colorPalette="brand"
              loading={isSaving}
              loadingText="Salvando cores"
              disabled={!canUpdate || !form.formState.isDirty}
            >
              <Icon as={Save} boxSize="5" />
              Salvar cores
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
  )
}
