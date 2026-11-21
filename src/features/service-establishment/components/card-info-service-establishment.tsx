import {
  AspectRatio,
  Box,
  Card,
  Flex,
  For,
  Icon,
  Image,
  SimpleGrid,
} from '@chakra-ui/react'
import { FileImage } from 'lucide-react'

import { ItemDetails } from '@/components/item-details'
import { cardSectionCss } from '@/theme/styles/global-styles'

import type { ServiceEstablishmentDetailsModel } from '../types/service-establishment-details.model'
import { formattedDataServiceEstablishmentDetails } from '../utils/formatted-data-services-establishment'

interface CardInfoServiceEstablishementProps {
  serviceEstablishment?: ServiceEstablishmentDetailsModel
}

const CardInfoServiceEstablishement = ({
  serviceEstablishment,
}: CardInfoServiceEstablishementProps) => {
  const loadServiceEstablishmentInfo =
    formattedDataServiceEstablishmentDetails(serviceEstablishment)

  return (
    <Card.Root
      variant="outline"
      css={cardSectionCss}
      display="flex"
      alignItems="center"
      flexDir={{ base: 'column', xl: 'row' }}
      gap="8"
      h="full"
    >
      <Box w="52" maxW="full" flexShrink="0">
        {serviceEstablishment?.imageUrl && (
          <AspectRatio maxW="400px" ratio={4 / 3}>
            <Image
              border="1px solid"
              borderColor={{ _light: 'gray.200', _dark: 'secondary.500/20' }}
              rounded="xl"
              fit="cover"
              src={serviceEstablishment.imageUrl}
            />
          </AspectRatio>
        )}

        {!serviceEstablishment?.imageUrl && (
          <Flex
            p="2"
            bg={{ base: 'gray.200', _dark: 'gray.800' }}
            rounded="lg"
            placeContent="center"
          >
            <Icon boxSize="32">
              <FileImage />
            </Icon>
          </Flex>
        )}
      </Box>

      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        flex="1"
        w="full"
        gap="4"
        alignSelf="start"
      >
        <For each={loadServiceEstablishmentInfo}>
          {(service) => (
            <ItemDetails.Root
              key={service.label}
              direction="column"
              gridColumn={service.fullWidth ? '1 / -1' : undefined}
            >
              <ItemDetails.Label>{service.label}</ItemDetails.Label>
              <ItemDetails.Value>{service.content}</ItemDetails.Value>
            </ItemDetails.Root>
          )}
        </For>
      </SimpleGrid>
    </Card.Root>
  )
}

export default CardInfoServiceEstablishement
