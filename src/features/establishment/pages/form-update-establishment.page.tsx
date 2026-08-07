import {
  Alert,
  Button,
  chakra,
  For,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Save } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

import FormIntervalEstablishment from '../components/form-intervals-establishment'
import FormTelephoneEstablishment from '../components/form-telephone-establishment'
import { useFormUpdateEstablishment } from '../hooks/use-form-update-establishment'

const FormUpdateEstablishment = () => {
  const {
    control,
    getValues,
    register,
    handleSubmit,
    errors,
    isPendingUpdateEstablishment,
    isLoadingEstablishment,
    errorEstablishment,
    handleUpdateEstablishment,
    handleCloseAlertUpdatePhone,
    handleCloseAlertUpdateIntervals,
    onBlurZipCodeUpdateEstablishment,
  } = useFormUpdateEstablishment()

  if (errorEstablishment) {
    return (
      <Alert.Root status="error" variant="surface" rounded="xl">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>
            Ops! Não foi possível carregar estabelecimento
          </Alert.Title>
          <Alert.Description>
            Error: {errorEstablishment.message}
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  if (isLoadingEstablishment) {
    return (
      <Stack gap="2" w="full">
        <For each={[1, 2, 3]}>
          {(item) => (
            <Skeleton
              key={item}
              height="60px"
              rounded="lg"
              bg={{ base: 'gray.200', _dark: 'gray.700/70' }}
            />
          )}
        </For>
      </Stack>
    )
  }

  return (
    <chakra.form w="full" onSubmit={handleSubmit(handleUpdateEstablishment)}>
      <SimpleGrid columns={{ base: 1, md: 4 }} gap="4" w="full">
        <Field
          gridColumn={{ base: 'span 1', lg: 'span 2' }}
          invalid={!!errors.name}
          errorText={errors.name?.message}
        >
          <InputField {...register('name')} placeholder="Digite seu nome" />
        </Field>

        <Field
          gridColumn={{ base: 'span 1', md: 'span 2' }}
          invalid={!!errors.description}
          errorText={errors.description?.message}
        >
          <InputField
            {...register('description')}
            placeholder="Digite a descrição"
          />
        </Field>

        <FormIntervalEstablishment
          values={getValues()}
          control={control}
          errors={errors}
          onCloseAlertInterval={handleCloseAlertUpdateIntervals}
        />

        <FormTelephoneEstablishment
          control={control}
          errors={errors}
          onCloseAlertTelephone={handleCloseAlertUpdatePhone}
        />

        <SimpleGrid
          aria-label="Form Address"
          gridColumn={{ base: 'span 1', md: 'span 4' }}
          columns={{ base: 1, md: 4 }}
          gap="4"
          w="full"
        >
          <GridItem
            colSpan={{ base: 1, md: 4 }}
            placeSelf={{ base: 'center', md: 'start' }}
            pl="2"
          >
            <Text as="span">Endereço</Text>
          </GridItem>

          <Controller
            name="address.zipCode"
            control={control}
            render={({ field }) => (
              <Field
                invalid={!!errors.address?.zipCode}
                errorText={errors.address?.zipCode?.message}
              >
                <PatternFormat
                  value={field.value}
                  onValueChange={(values) => field.onChange(values.value)}
                  format="#####-###"
                  placeholder="00000-000"
                  mask="_"
                  customInput={InputField}
                  onBlur={() => onBlurZipCodeUpdateEstablishment(field.value)}
                />
              </Field>
            )}
          />

          <Field
            gridColumn={{ base: 'span 1', md: 'span 2' }}
            invalid={!!errors.address?.street}
            errorText={errors.address?.street?.message}
          >
            <InputField
              {...register('address.street')}
              placeholder="Digite o endereço"
            />
          </Field>
          <Field
            invalid={!!errors.address?.number}
            errorText={errors.address?.number?.message}
          >
            <InputField
              {...register('address.number')}
              placeholder="Digite o número"
            />
          </Field>
          <Field
            gridColumn={{ base: 'span 1', md: 'span 2' }}
            invalid={!!errors.address?.neighborhood}
            errorText={errors.address?.neighborhood?.message}
          >
            <InputField
              {...register('address.neighborhood')}
              placeholder="Digite o bairro"
            />
          </Field>

          <HStack
            gap="4"
            align="start"
            gridColumn={{ base: 'span 1', md: 'span 2' }}
          >
            <Field
              invalid={!!errors.address?.city}
              errorText={errors.address?.city?.message}
            >
              <InputField
                {...register('address.city')}
                placeholder="Digite a cidade"
              />
            </Field>
            <Field
              invalid={!!errors.address?.state}
              errorText={errors.address?.state?.message}
            >
              <InputField
                {...register('address.state')}
                placeholder="Digite o estado"
              />
            </Field>
            <Field
              invalid={!!errors.address?.complement}
              errorText={errors.address?.complement?.message}
            >
              <InputField
                {...register('address.complement')}
                placeholder="Digite o complemento"
              />
            </Field>
          </HStack>
        </SimpleGrid>

        <GridItem
          colSpan={{ base: 1, md: 4 }}
          placeSelf={{ base: 'center', md: 'end' }}
        >
          <Button
            type="submit"
            size="sm"
            rounded="xl"
            w="fit"
            colorPalette="emerald"
            variant="subtle"
            loading={isPendingUpdateEstablishment}
          >
            <Icon as={Save} boxSize="4" />
            Salvar
          </Button>
        </GridItem>
      </SimpleGrid>
    </chakra.form>
  )
}

export default FormUpdateEstablishment
