import { defineSemanticTokens } from '@chakra-ui/react'

export const appointmentColors = defineSemanticTokens.colors({
  appointment: {
    confirmed: {
      bg: {
        value: {
          base: '#DCFCE7',
          _dark: '#143D2B',
        },
      },
      fg: {
        value: {
          base: '#166534',
          _dark: '#86EFAC',
        },
      },
    },

    concluded: {
      bg: {
        value: {
          base: '#DBEAFE',
          _dark: '#172E55',
        },
      },
      fg: {
        value: {
          base: '#1D4ED8',
          _dark: '#93C5FD',
        },
      },
    },

    cancelled: {
      bg: {
        value: {
          base: '#FEE2E2',
          _dark: '#4C1D24',
        },
      },
      fg: {
        value: {
          base: '#B91C1C',
          _dark: '#FCA5A5',
        },
      },
    },

    pending: {
      bg: {
        value: {
          base: '#FEF3C7',
          _dark: '#493514',
        },
      },
      fg: {
        value: {
          base: '#92400E',
          _dark: '#FCD34D',
        },
      },
    },
  },
})
