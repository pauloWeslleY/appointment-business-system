import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Select,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

import { useFormUpdateTaxInformation } from '../hooks/use-form-update-tax-information'

interface DialogFormUpdateTaxInformationProps {
  open: boolean
  onOpen: (open: boolean) => void
}

const DialogFormUpdateTaxInformation = ({
  open,
  onOpen,
}: DialogFormUpdateTaxInformationProps) => {
  const {
    handleDialogUpdateTaxInformation,
    handleUpdateTaxInformation,
    register,
    errors,
    control,
    isPendingUpdateTaxInformation,
    isLoadingTaxInformationSummary,
    loadSelectStatusTaxtInformationFormSendInvite,
  } = useFormUpdateTaxInformation(onOpen)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => handleDialogUpdateTaxInformation(e.open)}
      placement="center"
      motionPreset="slide-in-bottom"
      size="md"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content
            css={contentCss}
          >
            <Dialog.Header>
              <Dialog.Title>Atualizar Dados Fiscais</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {isLoadingTaxInformationSummary && (
                <Skeleton w="full" h="100px" rounded="lg" />
              )}

              {!isLoadingTaxInformationSummary && (
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                  <Field
                    gridColumn="1 / -1"
                    label="Razão Social"
                    invalid={Boolean(errors.legalName)}
                    errorText={errors.legalName?.message}
                  >
                    <InputField
                      {...register('legalName')}
                      placeholder="Ex: Razão Social Ltda"
                    />
                  </Field>

                  <Field
                    gridColumn="span 1"
                    label="Nome Fantasia"
                    invalid={Boolean(errors.tradeName)}
                    errorText={errors.tradeName?.message}
                  >
                    <InputField
                      {...register('tradeName')}
                      placeholder="Ex: Nome Fantasia"
                    />
                  </Field>

                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <Field
                        gridColumn="span 1"
                        label="Status"
                        invalid={Boolean(errors.status)}
                        errorText={errors.status?.message}
                      >
                        <Select.Root
                          size="sm"
                          variant="subtle"
                          collection={
                            loadSelectStatusTaxtInformationFormSendInvite
                          }
                          value={field.value}
                          onValueChange={({ value }) => field.onChange(value)}
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
                              <Select.ValueText placeholder="Selecione o status" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content css={contentCss}>
                                {loadSelectStatusTaxtInformationFormSendInvite.items.map(
                                  (taxInformationType) => (
                                    <Select.Item
                                      key={taxInformationType.value}
                                      item={taxInformationType}
                                      css={menuItemCss}
                                    >
                                      {taxInformationType.label}
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
              )}
            </Dialog.Body>
            <Dialog.Footer flexWrap="wrap" gap="2">
              <Dialog.ActionTrigger asChild>
                <Button
                  rounded="lg"
                  size="sm"
                  colorPalette="red"
                  disabled={isPendingUpdateTaxInformation}
                >
                  Fechar
                </Button>
              </Dialog.ActionTrigger>

              <Button
                rounded="lg"
                size="sm"
                colorPalette="brand"
                loading={isPendingUpdateTaxInformation}
                onClick={handleUpdateTaxInformation}
              >
                Atualizar
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

export default DialogFormUpdateTaxInformation
