import {
  Button,
  Checkbox,
  CloseButton,
  Dialog,
  Icon,
  Portal,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { UserRoundPlus } from 'lucide-react'
import { Controller } from 'react-hook-form'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

import { useFormSendInvite } from '../hooks/use-form-send-invite'

const DialogSendInvite = () => {
  const {
    organizationProfileError,
    isLoadingOrganizationProfile,
    isRestrictedScope,
    changeEstablishments,
    isLoadingEstablishmentsByOrganizationProfile,
    handleDialogSendInvite,
    handleSendInvite,
    register,
    errors,
    establishmentErrorMessage,
    control,
    loadSelectRoleFormSendInvite,
    loadSelectAccessScopeFormSendInvite,
    loadSelectEstablishmentsFormSendInvite,
    isPendingSendInvite,
    isOpenDialogSendInvite,
  } = useFormSendInvite()

  return (
    <Dialog.Root
      open={isOpenDialogSendInvite}
      onOpenChange={(e) => handleDialogSendInvite(e.open)}
      placement="center"
      motionPreset="slide-in-bottom"
      size="lg"
    >
      <Dialog.Trigger asChild>
        <Button rounded="2xl" size="xs">
          <Icon as={UserRoundPlus} boxSize="5" />
          Convidar Membro
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Convidar Membro</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY="4">
              {organizationProfileError && (
                <Text role="alert">{organizationProfileError.message}</Text>
              )}
              <Field
                label="E-mail do membro"
                invalid={Boolean(errors.email)}
                errorText={errors.email?.message}
              >
                <InputField
                  {...register('email')}
                  placeholder="Ex: email@dominio.com"
                  w="full"
                />
              </Field>

              <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
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
                        value={field.value ? [field.value] : []}
                        onValueChange={({ value }) => field.onChange(value[0])}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger
                            rounded="xl"
                            bg={{
                              _light: 'blackAlpha.100',
                              _dark: 'gray.800/40',
                            }}
                          >
                            <Select.ValueText placeholder="Selecione o escopo de acesso" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner>
                            <Select.Content css={contentCss}>
                              {loadSelectAccessScopeFormSendInvite.items.map(
                                (accessScope) => (
                                  <Select.Item
                                    key={accessScope.value}
                                    item={accessScope}
                                    css={menuItemCss}
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
                  name="role"
                  render={({ field }) => (
                    <Field
                      label="Papel"
                      invalid={Boolean(errors.role)}
                      errorText={errors.role?.message}
                    >
                      <Select.Root
                        w="full"
                        size="sm"
                        variant="subtle"
                        collection={loadSelectRoleFormSendInvite}
                        value={field.value ? [field.value] : []}
                        onValueChange={({ value }) => field.onChange(value[0])}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger
                            rounded="xl"
                            bg={{
                              _light: 'blackAlpha.100',
                              _dark: 'gray.800/40',
                            }}
                          >
                            <Select.ValueText placeholder="Selecione o papel" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner>
                            <Select.Content css={contentCss}>
                              {loadSelectRoleFormSendInvite.items.map(
                                (role) => (
                                  <Select.Item
                                    key={role.value}
                                    item={role}
                                    css={menuItemCss}
                                  >
                                    {role.label}
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
                        disabled={
                          !isRestrictedScope ||
                          isLoadingOrganizationProfile ||
                          isLoadingEstablishmentsByOrganizationProfile ||
                          Boolean(organizationProfileError)
                        }
                        onValueChange={({ value }) =>
                          field.onChange(changeEstablishments(value))
                        }
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger
                            rounded="xl"
                            bg={{
                              _light: 'blackAlpha.100',
                              _dark: 'gray.800/40',
                            }}
                          >
                            <Select.ValueText placeholder="Selecione os estabelecimentos" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
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
                                    css={menuItemCss}
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

              <Controller
                control={control}
                name="resend"
                render={({ field }) => (
                  <Field
                    invalid={Boolean(errors.resend)}
                    disabled={field.disabled}
                  >
                    <Checkbox.Root
                      checked={field.value}
                      onCheckedChange={({ checked }) =>
                        field.onChange(checked === true)
                      }
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control rounded="md" />
                      <Checkbox.Label>Reenviar convite</Checkbox.Label>
                    </Checkbox.Root>
                  </Field>
                )}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" rounded="lg" size="sm">
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                rounded="lg"
                size="sm"
                loading={isPendingSendInvite}
                disabled={
                  isRestrictedScope &&
                  (isLoadingOrganizationProfile ||
                    isLoadingEstablishmentsByOrganizationProfile ||
                    Boolean(organizationProfileError))
                }
                onClick={handleSendInvite}
              >
                Enviar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DialogSendInvite
