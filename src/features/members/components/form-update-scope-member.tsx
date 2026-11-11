import {
  Button,
  chakra,
  Portal,
  Select,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import {
  cardSectionCss,
  contentCss,
  inputFieldStyles,
  menuItemCss,
} from '@/theme/styles/global-styles'

import {
  loadSelectAccessScopeFormSendInvite,
  useFormUpadteScopeMember,
} from '../hooks/use-form-update-scope-member'

interface FormUpadteScopeMemberProps {
  memberId?: string
}

const FormUpadteScopeMember = ({ memberId }: FormUpadteScopeMemberProps) => {
  const {
    loadSelectEstablishmentsFormSendInvite,
    isLoadingEstablishmentsByOrganizationProfile,
    isRestrictedScope,
    isPendingUpdateScopeMember,
    establishmentErrorMessage,
    errors,
    control,
    handleSubmit,
    handleFormSubmitUpdateScopeMember,
    onChangeSelectEstablishments,
    onChangeSelectAccessScope,
  } = useFormUpadteScopeMember(memberId)

  return (
    <chakra.form
      onSubmit={handleSubmit(handleFormSubmitUpdateScopeMember)}
      display="flex"
      flexDirection="column"
      gap="4"
      border="1px solid"
      {...cardSectionCss}
      p="2"
      shadow="none"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <Controller
          control={control}
          name="accessScope"
          render={({ field }) => (
            <Field
              label="Escopo de Acesso"
              invalid={Boolean(errors.accessScope)}
              errorText={errors.accessScope?.message}
            >
              <Select.Root
                w="full"
                size="sm"
                variant="subtle"
                collection={loadSelectAccessScopeFormSendInvite}
                value={[...field.value]}
                onValueChange={({ value }) => {
                  field.onChange(value)
                  onChangeSelectAccessScope(value)
                }}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger {...inputFieldStyles}>
                    <Select.ValueText placeholder="Selecione o escopo de acesso" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content {...contentCss}>
                      {loadSelectAccessScopeFormSendInvite.items.map(
                        (accessScope) => (
                          <Select.Item
                            key={accessScope.value}
                            item={accessScope}
                            {...menuItemCss}
                          >
                            {accessScope.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ),
                      )}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Field>
          )}
        />

        <Controller
          control={control}
          name="establishmentIds"
          render={({ field }) => (
            <Field
              label="Estabelecimentos"
              invalid={Boolean(errors.establishmentIds)}
              errorText={establishmentErrorMessage}
            >
              <Select.Root
                w="full"
                size="sm"
                variant="subtle"
                collection={loadSelectEstablishmentsFormSendInvite}
                value={field.value}
                multiple
                disabled={!isRestrictedScope}
                onValueChange={({ value }) =>
                  field.onChange(onChangeSelectEstablishments(value))
                }
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger {...inputFieldStyles}>
                    <Select.ValueText placeholder="Selecione os estabelecimentos" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    {isLoadingEstablishmentsByOrganizationProfile && (
                      <Spinner size="sm" />
                    )}
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content css={contentCss}>
                      {loadSelectEstablishmentsFormSendInvite.items.map(
                        (establishment) => (
                          <Select.Item
                            key={establishment.value}
                            item={establishment}
                            {...menuItemCss}
                          >
                            {establishment.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ),
                      )}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Field>
          )}
        />
      </SimpleGrid>

      <Button
        type="submit"
        size="xs"
        rounded="lg"
        alignSelf="flex-end"
        colorPalette="brand"
        loading={isPendingUpdateScopeMember}
      >
        Salvar
      </Button>
    </chakra.form>
  )
}

export default FormUpadteScopeMember
