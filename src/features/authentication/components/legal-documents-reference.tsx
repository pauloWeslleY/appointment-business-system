import { Link, Text } from '@chakra-ui/react'

export default function LegalDocumentsReference() {
  return (
    <Text
      fontSize="xs"
      lineHeight="tall"
      color={{ _light: 'slate.500', _dark: 'slate.400' }}
    >
      Conheça os{' '}
      <Link
        href="/terms-of-use"
        target="_blank"
        rel="noopener noreferrer"
        color={{ _light: 'sea.700', _dark: 'sea.300' }}
        textDecoration="underline"
      >
        Termos de Uso
      </Link>{' '}
      e a{' '}
      <Link
        href="/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        color={{ _light: 'sea.700', _dark: 'sea.300' }}
        textDecoration="underline"
      >
        Política de Privacidade
      </Link>{' '}
      para clientes do Agendros. Os links abrem em nova aba.
    </Text>
  )
}
