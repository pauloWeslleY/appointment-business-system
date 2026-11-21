import {
  Alert,
  Box,
  Button,
  Card,
  chakra,
  Checkbox,
  Fieldset,
  Flex,
  Grid,
  HStack,
  Icon,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'

import PasswordStrengthMeter from '@/components/password-strength-meter'
import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import { PASSWORD_MIN_LENGTH } from '@/shared/utils/regex-password-requirement'
import { cardSectionCss, inputFieldCss } from '@/theme/styles/global-styles'

import PasswordRequirementsChecklist from '../components/password-requirements-checklist'
import { useFormChangePassword } from '../hooks/use-form-change-password'

const CHANGE_PASSWORD_FORM_ID = 'change-password-form'

const FormChangePassword = () => {
  const {
    control,
    changePasswordFormErrors,
    isSubmittingChangePassword,
    isChangePasswordFormValid,
    newPassword,
    newPasswordStrength,
    shouldShowNewPasswordError,
    isSubmitDisabled,
    register,
    handleSubmit,
    submitChangePassword,
    cancelChangePassword,
  } = useFormChangePassword()

  return (
    <Card.Root variant="outline" css={cardSectionCss} h="fit">
      <Grid templateColumns={{ base: '1fr', xl: '1fr 550px' }} gap="4">
        <Box spaceY="2">
          <Card.Header pt="0" px="0">
            <Card.Title lineHeight="shorter">Alterar senha</Card.Title>
            <Card.Description>
              Informe sua senha atual para definir uma nova senha de acesso.
            </Card.Description>
          </Card.Header>

          <Alert.Root
            status="neutral"
            variant="surface"
            shadow="none"
            rounded="xl"
            borderWidth="1px"
            borderColor={{ _light: 'gray.200', _dark: 'slate.900' }}
            bg={{ _light: 'slate.100', _dark: 'slate.950/60' }}
          >
            <Alert.Indicator color={{ _light: 'sea.500', _dark: 'sea.400' }} />
            <Alert.Title
              color={{ _light: 'gray.600', _dark: 'gray.400' }}
              css={{
                '& strong': {
                  color: {
                    _light: 'sea.900',
                    _dark: 'sea.100',
                  },
                },
              }}
            >
              <strong>Dica:</strong> uma frase longa e fácil de lembrar, como
              "cafe-forte-no- salao-27", é mais segura que uma palavra curta e
              complexa.
            </Alert.Title>
          </Alert.Root>

          <PasswordRequirementsChecklist password={newPassword} />

          <Text
            pl="2"
            fontSize="sm"
            color={{ _light: 'slate.500', _dark: 'slate.400' }}
          >
            {!isChangePasswordFormValid &&
              'Cumpra todos os requisitos da nova senha.'}
          </Text>
        </Box>

        <chakra.form
          id={CHANGE_PASSWORD_FORM_ID}
          onSubmit={handleSubmit(submitChangePassword)}
          noValidate
        >
          <Fieldset.Root disabled={isSubmittingChangePassword}>
            <Fieldset.Content>
              <Field
                required
                label="Senha atual"
                invalid={!!changePasswordFormErrors.currentPassword}
                errorText={changePasswordFormErrors.currentPassword?.message}
              >
                <PasswordInput
                  {...register('currentPassword')}
                  autoComplete="current-password"
                  placeholder="Digite sua senha atual"
                  size="sm"
                  variant="subtle"
                  {...inputFieldCss}
                />
              </Field>

              <Separator
                mx="2"
                borderColor={{ base: 'slate.200', md: 'slate.800' }}
              />

              <Stack gap="3">
                <Field
                  required
                  label="Nova senha"
                  helperText={`Use pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`}
                  invalid={shouldShowNewPasswordError}
                  errorText={changePasswordFormErrors.newPassword?.message}
                >
                  <PasswordInput
                    {...register('newPassword')}
                    autoComplete="new-password"
                    placeholder="Digite a nova senha"
                    size="sm"
                    variant="subtle"
                    {...inputFieldCss}
                  />
                </Field>

                <PasswordStrengthMeter strength={newPasswordStrength} />
              </Stack>

              <Field
                required
                label="Confirmar nova senha"
                invalid={!!changePasswordFormErrors.confirmPassword}
                errorText={changePasswordFormErrors.confirmPassword?.message}
              >
                <PasswordInput
                  {...register('confirmPassword')}
                  autoComplete="new-password"
                  placeholder="Repita a nova senha"
                  size="sm"
                  variant="subtle"
                  {...inputFieldCss}
                />
              </Field>

              <Flex
                justify="center"
                flexDir="column"
                py="2"
                px="4"
                rounded="xl"
                borderWidth="1px"
                borderColor={{ _light: 'gray.200', _dark: 'slate.900' }}
                bg={{ _light: 'slate.100', _dark: 'slate.950/60' }}
              >
                <Controller
                  control={control}
                  name="revokeOtherSessions"
                  render={({ field }) => (
                    <Checkbox.Root
                      colorPalette="brand"
                      size="sm"
                      disabled={isSubmittingChangePassword}
                      checked={field.value}
                      onCheckedChange={({ checked }) =>
                        field.onChange(checked === true)
                      }
                    >
                      <Checkbox.HiddenInput
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                      />
                      <Checkbox.Control rounded="sm">
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label fontWeight="normal">
                        Encerrar sessões em outros dispositivos
                      </Checkbox.Label>
                    </Checkbox.Root>
                  )}
                />
              </Flex>

              <HStack gap="3" justify="flex-end">
                <Button
                  type="button"
                  variant="surface"
                  size="sm"
                  rounded="lg"
                  colorPalette="red"
                  disabled={isSubmittingChangePassword}
                  onClick={cancelChangePassword}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  form={CHANGE_PASSWORD_FORM_ID}
                  size="sm"
                  rounded="lg"
                  colorPalette="brand"
                  disabled={isSubmitDisabled}
                  loading={isSubmittingChangePassword}
                >
                  <Icon as={SaveIcon} />
                  Atualizar senha
                </Button>
              </HStack>
            </Fieldset.Content>

            {changePasswordFormErrors.root && (
              <Alert.Root status="error" rounded="lg">
                <Alert.Indicator />
                <Alert.Title>
                  {changePasswordFormErrors.root.message}
                </Alert.Title>
              </Alert.Root>
            )}
          </Fieldset.Root>
        </chakra.form>
      </Grid>
    </Card.Root>
  )
}

export default FormChangePassword
