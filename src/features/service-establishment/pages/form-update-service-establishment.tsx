import {
  Alert,
  Box,
  Button,
  chakra,
  Flex,
  GridItem,
  HStack,
  Image,
  Separator,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'

import FieldsServiceEstablishment from '../components/fields-service-establishment'
import UploadImageServiceEstablishment from '../components/upload-image-service-establishment'
import { useFormUpdateServiceEstablishment } from '../hooks/use-form-update-service-establishment'

const serviceEstablishmentPageRoute = getRouteApi(
  '/_app/_authenticated/dashboard/$slug/services/_pages/$serviceEstablishmentId',
)

const FormUpdateServiceEstablishment = () => {
  const serviceEstablishment = serviceEstablishmentPageRoute.useLoaderData()

  const {
    errors,
    control,
    register,
    handleSubmit,
    isUpdatingServiceEstablishment,
    onSubmitUpdateServiceEstablishment,
  } = useFormUpdateServiceEstablishment(serviceEstablishment)

  return (
    <chakra.form
      w="full"
      display="flex"
      flexDirection="column"
      gap="4"
      onSubmit={handleSubmit(onSubmitUpdateServiceEstablishment)}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
        <FieldsServiceEstablishment
          control={control}
          register={register}
          errors={errors}
        />

        <GridItem gridColumn="1 / -1" asChild>
          <HStack>
            <Text flexShrink="0">Imagem do serviço</Text>
            <Separator
              flex="1"
              borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            />
          </HStack>
        </GridItem>

        <GridItem gridColumn="1 / -1">
          <Flex gap="2" flexWrap="wrap">
            {serviceEstablishment.imageUrl && (
              <Box flex="1" minW={{ base: 'full', md: '0' }}>
                <Image
                  border="1px solid"
                  borderColor={{
                    base: 'gray.200',
                    _dark: 'secondary.500/20',
                  }}
                  rounded="xl"
                  w="full"
                  h="48"
                  fit="contain"
                  src={serviceEstablishment.imageUrl}
                  alt={`Imagem atual do serviço ${serviceEstablishment.name}`}
                />
              </Box>
            )}

            <UploadImageServiceEstablishment
              control={control}
              errors={errors}
            />
          </Flex>
        </GridItem>
      </SimpleGrid>

      <Button
        type="submit"
        size="sm"
        rounded="lg"
        w="fit"
        alignSelf="flex-end"
        colorPalette="emerald"
        variant="subtle"
        loading={isUpdatingServiceEstablishment}
        loadingText="Salvando..."
      >
        Salvar alterações
      </Button>

      {isUpdatingServiceEstablishment && (
        <Alert.Root
          borderStartWidth="3px"
          borderStartColor="colorPalette.600"
          mt="2"
          role="status"
        >
          <Alert.Indicator>
            <Spinner size="sm" />
          </Alert.Indicator>
          <Alert.Title>Atualizando serviço...</Alert.Title>
        </Alert.Root>
      )}
    </chakra.form>
  )
}

export default FormUpdateServiceEstablishment
