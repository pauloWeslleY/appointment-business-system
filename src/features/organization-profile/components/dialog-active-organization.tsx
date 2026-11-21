import {
  Alert,
  Box,
  Button,
  CloseButton,
  Dialog,
  Icon,
  Portal,
  Select,
  Spinner,
} from '@chakra-ui/react'
import { BuildingIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import {
  contentCss,
  inputFieldCss,
  menuItemCss,
} from '@/theme/styles/global-styles'

import { useFormActiveOrganization } from '../hooks/use-form-active-organization'

const MotionBox = motion.create(Box)

const DialogActiveOrganization = () => {
  const shouldReduceOpeningHoursMotion = useReducedMotion()
  const {
    errors,
    control,
    loadSelectOrganizations,
    isLoadingOrganizations,
    isPendingUpdateActiveOrganization,
    isDialogOpenActiveOrganization,
    setIsDialogOpenActiveOrganization,
    handleActiveOrganizationProfile,
  } = useFormActiveOrganization()

  return (
    <Dialog.Root
      size="md"
      motionPreset="slide-in-bottom"
      placement="center"
      open={isDialogOpenActiveOrganization}
      onOpenChange={(e) => setIsDialogOpenActiveOrganization(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button colorPalette="primary" size="sm" variant="surface" rounded="lg">
          Ativar empresa
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Icon
                as={BuildingIcon}
                color={{ _light: 'teal.700', _dark: 'teal.400' }}
              />
              <Dialog.Title>Empresa ativa</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY="4">
              <Controller
                name="organizationId"
                control={control}
                render={({ field }) => (
                  <Field
                    label="Minhas Empresas"
                    invalid={!!errors.organizationId}
                    errorText={errors.organizationId?.message}
                  >
                    <Select.Root
                      w="full"
                      size="sm"
                      variant="subtle"
                      name={field.name}
                      value={field.value}
                      onValueChange={({ value }) => field.onChange(value)}
                      onInteractOutside={() => field.onBlur()}
                      collection={loadSelectOrganizations}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger {...inputFieldCss}>
                          <Select.ValueText placeholder="Selecione a organização" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          {isLoadingOrganizations && (
                            <Spinner
                              size="xs"
                              borderWidth="1.5px"
                              color="fg.muted"
                            />
                          )}
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content css={contentCss}>
                            {loadSelectOrganizations.items.map(
                              (organization) => (
                                <Select.Item
                                  item={organization}
                                  key={organization.id}
                                  css={menuItemCss}
                                >
                                  {organization.name}
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

              <AnimatePresence>
                {errors.root && (
                  <MotionBox
                    key="opening-hours-limit"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: shouldReduceOpeningHoursMotion ? 0 : 0.4,
                      ease: 'easeInOut',
                    }}
                    overflow="hidden"
                  >
                    <Alert.Root
                      status="info"
                      variant="surface"
                      rounded="xl"
                      shadow="xs"
                      border="1px solid"
                      borderColor="blue.muted"
                      mt="4"
                      mb="2"
                    >
                      <Alert.Indicator />
                      <Alert.Title>
                        Ops! Não foi possível ativar o perfil da empresarial
                      </Alert.Title>
                      <Alert.Description>
                        {errors.root.message}
                      </Alert.Description>
                    </Alert.Root>
                  </MotionBox>
                )}
              </AnimatePresence>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  colorPalette="red"
                  rounded="lg"
                >
                  Fechar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                size="sm"
                rounded="lg"
                colorPalette="brand"
                loading={isPendingUpdateActiveOrganization}
                onClick={handleActiveOrganizationProfile}
              >
                Ativar empresa
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DialogActiveOrganization
