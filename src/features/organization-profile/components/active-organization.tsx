import {
  Button,
  Card,
  chakra,
  Icon,
  Portal,
  Select,
  Spinner,
} from '@chakra-ui/react'
import { Building } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import { cardSectionCss, contentCss } from '@/theme/styles/global-styles'

import { useFormAtiveOrganization } from '../hooks/use-form-ative-organization'

const ActiveOrganization = () => {
  const {
    errors,
    control,
    loadSelectOrganizations,
    isLoadingOrganizations,
    isPendingUpdateActiveOrganization,
    handleSubmit,
    handleUpdateOrganizationProfile,
  } = useFormAtiveOrganization()

  return (
    <Card.Root
      css={cardSectionCss}
      variant="outline"
      display="flex"
      flexDir="column"
      gap="4"
    >
      <Card.Title
        display="flex"
        alignItems="center"
        gap="2"
        color={{ _light: 'sea.600', _dark: 'sea.100' }}
      >
        <Icon as={Building} color={{ _light: 'teal.700', _dark: 'teal.400' }} />
        Empresa ativa
      </Card.Title>

      <chakra.form
        display="flex"
        flexDirection="row"
        gap="4"
        onSubmit={handleSubmit(handleUpdateOrganizationProfile)}
      >
        <Field
          w="1/3"
          invalid={!!errors.organizationId}
          errorText={errors.organizationId?.message}
        >
          <Controller
            control={control}
            name="organizationId"
            render={({ field }) => (
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
                  <Select.Trigger
                    rounded="xl"
                    bg={{ _light: 'blackAlpha.100', _dark: 'gray.800/40' }}
                  >
                    <Select.ValueText placeholder="Selecione a organização" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    {isLoadingOrganizations && (
                      <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
                    )}
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content css={contentCss}>
                      {loadSelectOrganizations.items.map((organization) => (
                        <Select.Item item={organization} key={organization.id}>
                          {organization.name}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            )}
          />
        </Field>

        <Button
          type="submit"
          size="sm"
          rounded="lg"
          loading={isPendingUpdateActiveOrganization}
        >
          Ativar
        </Button>
      </chakra.form>
    </Card.Root>
  )
}

export default ActiveOrganization
