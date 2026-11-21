import { Box, Flex, For, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

const bookingLinkChannels = [
  {
    title: 'Na bio do Instagram',
    icon: FaInstagram,
    description:
      'Adicione seu link ao perfil com o texto “Agendar horário”. Quem visitar sua bio pode abrir a página e consultar os serviços.',
  },
  {
    title: 'Em conversas no WhatsApp',
    icon: FaWhatsapp,
    description:
      'Envie o link quando alguém pedir um horário. Seu cliente pode ver as opções e solicitar um agendamento pela página.',
  },
]

export default function BookingLinkGuide() {
  return (
    <Box as="section" id="link-de-agendamento" pb={{ base: '8', md: '12' }}>
      <Heading
        as="h2"
        color="brand.navy"
        fontSize={{ base: '26px', md: '32px' }}
      >
        Onde usar seu link de agendamento
      </Heading>
      <Text color="brand.slate" mt="2" maxW="65ch">
        No painel, edite seu estabelecimento e copie a URL da página.
        Compartilhe o mesmo link nos canais em que você atende seus clientes.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" mt="5">
        <For each={bookingLinkChannels}>
          {({ title, icon: ChannelIcon, description }) => (
            <Box
              key={title}
              bg="sea.50"
              borderWidth="1px"
              borderColor="sea.100"
              rounded="xl"
              p="5"
            >
              <Flex align="center" gap="3">
                <Flex
                  align="center"
                  justify="center"
                  bg="sea.100"
                  color="sea.900"
                  boxSize="10"
                  flexShrink="0"
                  rounded="lg"
                >
                  <ChannelIcon size={20} aria-hidden="true" />
                </Flex>
                <Heading as="h3" color="brand.navy" fontSize="lg">
                  {title}
                </Heading>
              </Flex>
              <Text color="brand.slate" fontSize="sm" lineHeight="tall" mt="3">
                {description}
              </Text>
            </Box>
          )}
        </For>
      </SimpleGrid>
    </Box>
  )
}
