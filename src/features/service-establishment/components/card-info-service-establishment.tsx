import {
  Box,
  Card,
  Flex,
  For,
  HStack,
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
    <Card.Root variant="outline" css={cardSectionCss} h="fit">
      <HStack>
        <Box boxSize="48" mr="4">
          {serviceEstablishment?.imageUrl && (
            <Image
              border="1px solid"
              borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
              rounded="xl"
              h="auto"
              w="full"
              fit="contain"
              src={serviceEstablishment.imageUrl}
            />
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
          columns={{ base: 1, md: 3 }}
          flex="1"
          w="full"
          gap="4"
          alignSelf="start"
        >
          <For each={loadServiceEstablishmentInfo}>
            {(service) => (
              <ItemDetails.Root key={service.label} direction="column">
                <ItemDetails.Label>{service.label}</ItemDetails.Label>
                <ItemDetails.Value>{service.content}</ItemDetails.Value>
              </ItemDetails.Root>
            )}
          </For>
        </SimpleGrid>
      </HStack>
    </Card.Root>
  )
}

export default CardInfoServiceEstablishement
