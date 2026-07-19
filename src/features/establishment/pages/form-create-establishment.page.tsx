import {
  Button,
  Card,
  chakra,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

import FormIntervalEstablishment from '../components/form-intervals-establishment'
import FormTelephoneEstablishment from '../components/form-telephone-establishment'
import { useFormCreateEstablishment } from '../hooks/use-form-create-establishment'

const FormCreateEstablishmentPage = () => {
  const {
    control,
    getValues,
    register,
    handleSubmit,
    errors,
    isPendingCreateEstablishment,
    handleCreateEstablishment,
    handleCloseAlertCreatePhone,
    handleCloseAlertCreateIntervals,
    onBlurZipCodeCreateEstablishment,
  } = useFormCreateEstablishment()

  return (
    <Card.Root
      variant="outline"
      rounded="xl"
      p="4"
      bg={{ base: 'white', _dark: 'gray.950/40' }}
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
    >
      <chakra.form w="full" onSubmit={handleSubmit(handleCreateEstablishment)}>
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
            onCloseAlertInterval={handleCloseAlertCreateIntervals}
          />

          <FormTelephoneEstablishment
            control={control}
            errors={errors}
            onCloseAlertTelephone={handleCloseAlertCreatePhone}
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
                    onBlur={() => onBlurZipCodeCreateEstablishment(field.value)}
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
              w="fit-content"
              loading={isPendingCreateEstablishment}
            >
              Criar estabelecimento
            </Button>
          </GridItem>
        </SimpleGrid>
      </chakra.form>
    </Card.Root>
  )
}

export default FormCreateEstablishmentPage
