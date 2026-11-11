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
  const {
    establishmentColorsQuery,
    formEstablishmentColors,
    establishmentColorsValues,
    canUpdateEstablishmentColors,
    isPendingSaveEstablishmentColors,
    handleSaveEstablishmentColors,
    handleDiscardEstablishmentColors,
  } = useFormEstablishmentColors(establishmentSlug, memberContext)

  if (establishmentColorsQuery.isPending) {
    return (
      <Stack role="status" aria-label="Carregando cores">
        <Skeleton height="12" />
        <Skeleton height="32" />
      </Stack>
    )
  }

  if (establishmentColorsQuery.error) {
    return (
      <Alert.Root status="error" variant="surface" rounded="lg">
        <Alert.Indicator />
        <Stack>
          <Alert.Title>Não foi possível carregar as cores.</Alert.Title>
          <Alert.Description>
            {establishmentColorsQuery.error.message}
          </Alert.Description>
          <Button
            rounded="lg"
            type="button"
            size="sm"
            variant="outline"
            onClick={() => establishmentColorsQuery.refetch()}
          >
            Tentar novamente
          </Button>
        </Stack>
      </Alert.Root>
    )
  }

  if (!establishmentColorsQuery.data) {
    return (
      <Alert.Root status="info" variant="surface" rounded="lg">
        <Alert.Indicator />
        <Alert.Title>Selecione um estabelecimento para configurar.</Alert.Title>
      </Alert.Root>
    )
  }

  return (
    <chakra.form
      noValidate
      w="full"
      onSubmit={formEstablishmentColors.handleSubmit(
        handleSaveEstablishmentColors,
      )}
    >
      {!canUpdateEstablishmentColors && (
        <Alert.Root status="info" variant="surface" rounded="lg" mb="4">
          <Alert.Indicator />
          <Alert.Title>
            Seu acesso permite consultar estas cores. Alterações exigem
            permissão de edição do estabelecimento.
          </Alert.Title>
        </Alert.Root>
      )}

      <Fieldset.Root
        disabled={
          !canUpdateEstablishmentColors || isPendingSaveEstablishmentColors
        }
      >
        <Fieldset.Content gap="6">
          <EstablishmentColorFields
            form={formEstablishmentColors}
            values={establishmentColorsValues}
          />

          <Text fontSize="sm">
            As cores são salvas apenas para {establishmentColorsQuery.data.name}
            .
          </Text>

          <HStack justify="end" flexWrap="wrap" gap="3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              rounded="lg"
              alignSelf="start"
              colorPalette="red"
              disabled={!formEstablishmentColors.formState.isDirty}
              onClick={handleDiscardEstablishmentColors}
            >
              Descartar alterações
            </Button>

            <Button
              type="submit"
              size="sm"
              rounded="lg"
              alignSelf="start"
              colorPalette="brand"
              loading={isPendingSaveEstablishmentColors}
              loadingText="Salvando cores"
              disabled={
                !canUpdateEstablishmentColors ||
                !formEstablishmentColors.formState.isDirty
              }
            >
              <Icon as={Save} boxSize="5" />
              Salvar cores
            </Button>
          </HStack>
        </Fieldset.Content>
      </Fieldset.Root>
    </chakra.form>
  )
}
