import {
  Alert,
  Button,
  chakra,
  GridItem,
  Icon,
  InputGroup,
  Portal,
  Select,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react'
import { Save } from 'lucide-react'
import { Controller, FormProvider } from 'react-hook-form'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

import FormTelephoneEstablishment from '../components/form-telephone-establishment'
import {
  ESTABLISHMENT_WEBSITE_BASE,
  ESTABLISHMENT_WEBSITE_PATH_MAX_LENGTH,
} from '../constants/establishment-website'
import { useFormUpdateEstablishment } from '../hooks/use-form-update-establishment'

interface FormUpdateEstablishmentPageProps {
  establishmentSlug: string
}

const FormUpdateEstablishmentPage = ({
  establishmentSlug,
}: FormUpdateEstablishmentPageProps) => {
  const {
    errorEstablishment,
    isLoadingEstablishment,
    isPendingUpdateEstablishment,
    formUpdateEstablishment,
    loadSelectStatusUpdateEstablishment,
    handleUpdateEstablishment,
  } = useFormUpdateEstablishment(establishmentSlug)

  if (isLoadingEstablishment) {
    return <Skeleton h="40px" w="full" rounded="lg" />
  }

  if (errorEstablishment) {
    return (
      <Alert.Root status="error" variant="surface" rounded="lg">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>
            Não foi possível carregar o estabelecimento.
          </Alert.Title>
          <Alert.Description>{errorEstablishment.message}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  return (
    <FormProvider {...formUpdateEstablishment}>
      <chakra.form
        mt="4"
        w="full"
        onSubmit={formUpdateEstablishment.handleSubmit(
          handleUpdateEstablishment,
        )}
      >
        <SimpleGrid columns={{ base: 1, xl: 4 }} gap="4" w="full">
          <Field
            label="Nome"
            gridColumn={{ base: 'span 1', xl: 'span 2' }}
            invalid={!!formUpdateEstablishment.formState.errors.name}
            errorText={formUpdateEstablishment.formState.errors.name?.message}
          >
            <InputField
              {...formUpdateEstablishment.register('name')}
              placeholder="Ex: Estabelecimento XYZ"
            />
          </Field>

          <GridItem
            colSpan={{ base: 1, xl: 2 }}
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            gap="4"
          >
            <Field
              label="Fuso horário"
              invalid={!!formUpdateEstablishment.formState.errors.timezone}
              errorText={
                formUpdateEstablishment.formState.errors.timezone?.message
              }
            >
              <InputField
                {...formUpdateEstablishment.register('timezone')}
                placeholder="Ex: America/Sao_Paulo"
              />
            </Field>

            <Field
              label="E-mail"
              invalid={!!formUpdateEstablishment.formState.errors.email}
              errorText={
                formUpdateEstablishment.formState.errors.email?.message
              }
            >
              <InputField
                {...formUpdateEstablishment.register('email')}
                placeholder="Ex: email@dominio.com"
              />
            </Field>

            <Controller
              control={formUpdateEstablishment.control}
              name="status"
              render={({ field }) => (
                <Field
                  label="Status"
                  invalid={Boolean(
                    formUpdateEstablishment.formState.errors.status,
                  )}
                  errorText={
                    formUpdateEstablishment.formState.errors.status?.message
                  }
                >
                  <Select.Root
                    w="full"
                    size="sm"
                    variant="subtle"
                    disabled={
                      loadSelectStatusUpdateEstablishment.items.length === 0
                    }
                    collection={loadSelectStatusUpdateEstablishment}
                    value={field.value}
                    onValueChange={(e) => field.onChange(e.value)}
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
                        <Select.ValueText placeholder="Selecione o horário" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content css={contentCss}>
                          {loadSelectStatusUpdateEstablishment.items.map(
                            (hour) => (
                              <Select.Item
                                key={hour.value}
                                item={hour}
                                {...menuItemCss}
                              >
                                {hour.label}
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
          </GridItem>

          <Field
            label="Descrição"
            gridColumn="1 / -1"
            invalid={!!formUpdateEstablishment.formState.errors.description}
            errorText={
              formUpdateEstablishment.formState.errors.description?.message
            }
          >
            <InputField
              {...formUpdateEstablishment.register('description')}
              placeholder="Ex: Estabelecimento XYZ LTDA......"
            />
          </Field>

          <Field
            label="URL da página do estabelecimento"
            gridColumn="1 / -1"
            invalid={Boolean(
              formUpdateEstablishment.formState.errors.websiteUrl,
            )}
            errorText={
              formUpdateEstablishment.formState.errors.websiteUrl?.message
            }
            helperText="Digite apenas o caminho; o domínio será incluído ao salvar. Deixe em branco para remover."
          >
            <InputGroup
              startAddon={ESTABLISHMENT_WEBSITE_BASE}
              startAddonProps={{
                variant: 'subtle',
                size: 'sm',
                roundedTopLeft: 'xl',
                roundedBottomLeft: 'xl',
              }}
            >
              <InputField
                {...formUpdateEstablishment.register('websiteUrl')}
                type="text"
                placeholder="/seu-estabelecimento"
                autoComplete="off"
                maxLength={ESTABLISHMENT_WEBSITE_PATH_MAX_LENGTH}
              />
            </InputGroup>
          </Field>

          <FormTelephoneEstablishment />

          <GridItem
            gridColumn="1 / -1"
            placeSelf={{ base: 'center', md: 'end' }}
          >
            <Button
              type="submit"
              size="sm"
              rounded="lg"
              w="fit"
              colorPalette="brand"
              loading={isPendingUpdateEstablishment}
            >
              <Icon as={Save} boxSize="5" />
              Salvar estabelecimento
            </Button>
          </GridItem>
        </SimpleGrid>
      </chakra.form>
    </FormProvider>
  )
}

export default FormUpdateEstablishmentPage
