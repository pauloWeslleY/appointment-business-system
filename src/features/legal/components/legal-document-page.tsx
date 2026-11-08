import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Link,
  List,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ArrowLeft, ArrowUpRight, FileText, Mail } from 'lucide-react'
import type { ReactNode } from 'react'

import Logotipo from '@/components/logotipo'
import { ColorModeButton } from '@/components/ui/color-mode'

interface LegalDocumentPageProps {
  title: string
  description: string
  introduction: ReactNode
  sections: readonly {
    id: string
    number: string
    title: string
    paragraphs: readonly string[]
  }[]
}

const dateCurrentYearFooterLegalDocumentPage = new Date().getFullYear()

export default function LegalDocumentPage({
  title,
  description,
  introduction,
  sections,
}: LegalDocumentPageProps) {
  return (
    <Box
      minH="100dvh"
      bg={{ _light: 'slate.50', _dark: 'slate.950' }}
      color={{ _light: 'brand.navy', _dark: 'slate.100' }}
    >
      <Box
        as="header"
        borderBottomWidth="1px"
        borderColor={{ _light: 'slate.200', _dark: 'slate.800' }}
        bg={{ _light: 'white', _dark: 'slate.900' }}
      >
        <Container maxW="6xl" py="5" px={{ base: '5', md: '8' }}>
          <Flex align="center" justify="space-between" gap="4">
            <Link href="/" aria-label="Agendros — página inicial">
              <Logotipo variant="horizontal" w="150px" />
            </Link>
            <HStack gap="3">
              <ColorModeButton variant="ghost" aria-label="Alternar tema" />
              <Button asChild variant="outline" size="sm" rounded="lg">
                <a href="/">
                  <ArrowLeft size={16} />
                  Início
                </a>
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container
        as="main"
        maxW="6xl"
        px={{ base: '5', md: '8' }}
        py={{ base: '8', md: '14' }}
      >
        <Stack gap="5" mb={{ base: '8', md: '10' }} maxW="3xl">
          <HStack gap="2">
            <Icon
              as={FileText}
              color={{ _light: 'sea.700', _dark: 'sea.300' }}
            />
            <Text
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="widest"
              color={{ _light: 'sea.700', _dark: 'sea.300' }}
            >
              Transparência e confiança
            </Text>
          </HStack>
          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '5xl' }}
            letterSpacing="tight"
          >
            {title}
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color={{ base: 'slate.600', _dark: 'slate.400' }}
            lineHeight="tall"
          >
            {description}
          </Text>
          <HStack gap="3" flexWrap="wrap">
            <Badge colorPalette="teal" rounded="full" px="3" py="1">
              Para clientes
            </Badge>
            <Text
              fontSize="sm"
              color={{ base: 'slate.600', _dark: 'slate.400' }}
            >
              Versão 1.0 · Atualizado em 6 de novembro de 2026
            </Text>
          </HStack>
        </Stack>

        <Grid
          templateColumns={{ base: '1fr', lg: '250px minmax(0, 1fr)' }}
          gap={{ base: '6', lg: '10' }}
          alignItems="start"
        >
          <Stack
            as="aside"
            position={{ lg: 'sticky' }}
            top="6"
            gap="5"
            maxH={{ lg: 'calc(100dvh - 3rem)' }}
            overflowY={{ lg: 'auto' }}
          >
            <Box
              as="nav"
              aria-label={`Seções: ${title}`}
              bg={{ _light: 'white', _dark: 'slate.900' }}
              borderWidth="1px"
              borderColor={{ _light: 'slate.200', _dark: 'slate.800' }}
              rounded="2xl"
              p="5"
            >
              <Text fontWeight="bold" fontSize="sm" mb="4">
                Neste documento
              </Text>
              <Stack gap="1">
                {sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    fontSize="sm"
                    py="2"
                    color={{ _light: 'slate.600', _dark: 'slate.400' }}
                    _hover={{
                      color: {
                        _light: 'sea.700',
                        _dark: 'sea.300',
                      },
                    }}
                  >
                    {section.number}. {section.title}
                  </Link>
                ))}
              </Stack>
            </Box>
            <Stack gap="2" fontSize="sm" p="1">
              <Link
                href="/terms-of-use"
                color={{ _light: 'sea.700', _dark: 'sea.300' }}
              >
                Termos de Uso
              </Link>
              <Link
                href="/privacy-policy"
                color={{ _light: 'sea.700', _dark: 'sea.300' }}
              >
                Política de Privacidade
              </Link>
            </Stack>
            <Stack
              rounded="xl"
              bg={{ _light: 'sea.50', _dark: 'slate.900' }}
              p="5"
              gap="2"
            >
              <Icon as={Mail} color={{ _light: 'sea.700', _dark: 'sea.300' }} />
              <Text fontWeight="semibold" fontSize="sm">
                Precisa de ajuda?
              </Text>
              <Text
                fontSize="sm"
                color={{ _light: 'slate.600', _dark: 'slate.400' }}
              >
                Fale com o suporte sobre sua conta ou o uso da plataforma.
              </Text>
              <Link
                href="mailto:weslleywebdesign13@outlook.com"
                fontSize="sm"
                fontWeight="semibold"
                color={{ _light: 'sea.700', _dark: 'sea.300' }}
              >
                Entrar em contato <ArrowUpRight size={15} />
              </Link>
            </Stack>
          </Stack>

          <Box
            as="article"
            bg={{ _light: 'white', _dark: 'slate.900' }}
            borderWidth="1px"
            borderColor={{ _light: 'slate.200', _dark: 'slate.800' }}
            rounded="2xl"
            px={{ base: '5', md: '9' }}
            py={{ base: '6', md: '9' }}
          >
            <Stack
              gap="4"
              pb="8"
              borderBottomWidth="1px"
              borderColor={{ _light: 'slate.200', _dark: 'slate.800' }}
            >
              <Text lineHeight="tall">{introduction}</Text>
              <Text
                fontSize="sm"
                lineHeight="tall"
                color={{ _light: 'slate.600', _dark: 'slate.400' }}
              >
                <strong>Responsável pela plataforma:</strong> Paulo Weslley de
                Lima Firmino.
                <br />
                <strong>Contato:</strong>{' '}
                <Link
                  href="mailto:weslleywebdesign13@outlook.com"
                  overflowWrap="anywhere"
                >
                  weslleywebdesign13@outlook.com
                </Link>
              </Text>
            </Stack>
            {sections.map((section) => (
              <Stack
                as="section"
                key={section.id}
                id={section.id}
                scrollMarginTop="8"
                gap="4"
                pt="8"
              >
                <Heading
                  as="h2"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  lineHeight="tall"
                >
                  {section.number}. {section.title}
                </Heading>
                {section.paragraphs.map((paragraph) =>
                  paragraph.startsWith('- ') ? (
                    <List.Root
                      key={paragraph}
                      ps="5"
                      gap="2"
                      color={{ _light: 'slate.600', _dark: 'slate.300' }}
                      lineHeight="1.85"
                    >
                      {paragraph.split('\n').map((item) => (
                        <List.Item key={item}>
                          {item.replace(/^- /, '')}
                        </List.Item>
                      ))}
                    </List.Root>
                  ) : (
                    <Text
                      key={paragraph}
                      color={{ _light: 'slate.600', _dark: 'slate.300' }}
                      lineHeight="1.85"
                    >
                      {paragraph}
                    </Text>
                  ),
                )}
              </Stack>
            ))}
          </Box>
        </Grid>

        <Text
          as="footer"
          mt="8"
          fontSize="sm"
          color={{ base: 'slate.500', _dark: 'slate.400' }}
        >
          © {dateCurrentYearFooterLegalDocumentPage} Agendros. Todos os direitos
          reservados.
        </Text>
      </Container>
    </Box>
  )
}
