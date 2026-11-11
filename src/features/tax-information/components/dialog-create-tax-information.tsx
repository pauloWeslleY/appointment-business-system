import {
  Alert,
  type AlertRootProps,
  Box,
  Button,
  CloseButton,
  Dialog,
  Icon,
  Portal,
  Select,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import {
  contentCss,
  inputFieldStyles,
  menuItemCss,
} from '@/theme/styles/global-styles'

import {
  loadSelectTaxtInformationFormSendInvite,
  useFormCreateTaxInformation,
} from '../hooks/use-form-create-tax-information'

const DialogFormCreateTaxInformation = () => {
  const {
    onChangeClearTaxIdCreateTaxInformation,
    handleUpdateInputsTradeNameAndLegalName,
    handleVerifyCnpjCreateTaxInformation,
    handleDialogCreateTaxInformation,
    handleCreateTaxInformation,
    handleUpdateInputsTradeNameAndLegalNameWithTaxInformation,
    register,
    errors,
    control,
    taxIdMaskSelected,
    taxInformationVerify,
    isValidCNPJ,
    isFetchingVerificationCnpj,
    isLoadingOrganizationProfile,
    isPendingCreateTaxInformation,
    isOpenDialogCreateTaxInformation,
  } = useFormCreateTaxInformation()

  return (
    <Dialog.Root
      open={isOpenDialogCreateTaxInformation}
      onOpenChange={(e) => handleDialogCreateTaxInformation(e.open)}
      placement="center"
      motionPreset="slide-in-bottom"
      size="lg"
    >
      <Dialog.Trigger asChild>
        <Button rounded="lg" colorPalette="brand" size="sm">
          <Icon as={Plus} boxSize="5" />
          Cadastrar dados fiscais
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Cadastrar Dados Fiscais</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                {isLoadingOrganizationProfile ? (
                  <Box gridColumn="1 / -1">
                    <Skeleton h="30px" w="full" rounded="lg" />
                  </Box>
                ) : (
                  <>
                    <Field
                      label="Razão Social"
                      invalid={Boolean(errors.legalName)}
                      errorText={errors.legalName?.message}
                    >
                      <InputField
                        {...register('legalName')}
                        placeholder="Ex: Razão Social Ltda"
                        w="full"
                      />
                    </Field>

                    <Field
                      label="Nome Fantasia"
                      invalid={Boolean(errors.tradeName)}
                      errorText={errors.tradeName?.message}
                    >
                      <InputField
                        {...register('tradeName')}
                        placeholder="Ex: Nome Fantasia"
                        w="full"
                      />
                    </Field>
                  </>
                )}

                <Controller
                  control={control}
                  name="taxIdType"
                  render={({ field }) => (
                    <Field
                      label="Tipo de Identificação Fiscal"
                      invalid={Boolean(errors.taxIdType)}
                      errorText={errors.taxIdType?.message}
                    >
                      <Select.Root
                        w="full"
                        size="sm"
                        variant="subtle"
                        collection={loadSelectTaxtInformationFormSendInvite}
                        value={field.value}
                        onValueChange={({ value }) => {
                          onChangeClearTaxIdCreateTaxInformation(value)
                          field.onChange(value)
                        }}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger {...inputFieldStyles}>
                            <Select.ValueText placeholder="Selecione o tipo de identificação fiscal" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner>
                            <Select.Content css={contentCss}>
                              {loadSelectTaxtInformationFormSendInvite.items.map(
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

                <Controller
                  name="taxId"
                  control={control}
                  render={({ field }) => (
                    <Field
                      label={taxIdMaskSelected.label}
                      invalid={Boolean(errors.taxId)}
                      errorText={errors.taxId?.message}
                    >
                      <PatternFormat
                        value={field.value}
                        onValueChange={(values) => field.onChange(values.value)}
                        format={taxIdMaskSelected.mask}
                        placeholder={taxIdMaskSelected.placeHolder}
                        mask="_"
                        customInput={InputField}
                      />
                    </Field>
                  )}
                />
              </SimpleGrid>

              {isValidCNPJ && (
                <Alert.Root
                  status={
                    taxInformationVerify.status as AlertRootProps['status']
                  }
                  mt="4"
                  rounded="lg"
                >
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>{taxInformationVerify.title}</Alert.Title>
                    <Alert.Description>
                      {taxInformationVerify.description}
                    </Alert.Description>
                  </Alert.Content>

                  {taxInformationVerify.status === 'warning' && (
                    <Button
                      rounded="lg"
                      size="xs"
                      variant="surface"
                      onClick={handleVerifyCnpjCreateTaxInformation}
                      loading={isFetchingVerificationCnpj > 0}
                    >
                      Verificar CNPJ
                    </Button>
                  )}

                  {taxInformationVerify.status === 'success' && (
                    <Button
                      rounded="lg"
                      size="xs"
                      variant="surface"
                      onClick={
                        handleUpdateInputsTradeNameAndLegalNameWithTaxInformation
                      }
                    >
                      Utilizar dados do CNPJ
                    </Button>
                  )}
                </Alert.Root>
              )}
            </Dialog.Body>
            <Dialog.Footer flexWrap="wrap" gap="2">
              <Button
                rounded="lg"
                size="sm"
                variant="plain"
                loading={isLoadingOrganizationProfile}
                onClick={handleUpdateInputsTradeNameAndLegalName}
              >
                Utilizar dados do perfil empresarial
              </Button>

              <Dialog.ActionTrigger asChild>
                <Button
                  rounded="lg"
                  size="sm"
                  colorPalette="red"
                  disabled={isPendingCreateTaxInformation}
                >
                  Fechar
                </Button>
              </Dialog.ActionTrigger>

              <Button
                rounded="lg"
                size="sm"
                colorPalette="brand"
                loading={isPendingCreateTaxInformation}
                onClick={handleCreateTaxInformation}
              >
                Cadastrar
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

export default DialogFormCreateTaxInformation
