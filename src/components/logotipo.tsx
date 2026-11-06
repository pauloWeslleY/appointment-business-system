import { Image, type ImageProps } from '@chakra-ui/react'

import { useColorModeValue } from './ui/color-mode'

type Theme = 'light' | 'dark'

interface ThemeLogos {
  app: string
  icon: string
  horizontal: string
  vertical: string
  monochrome: string
}

// Logos anteriores preservados para referência.
/*
const logos = {
  app: {
    light: '/logo/app-light.svg',
    dark: '/logo/app-dark.svg',
    mint: '/logo/app-mint.svg',
    navy: '/logo/app-navy.svg',
  },
  icon: {
    white: '/logo/icon-white.svg',
    gradient: '/logo/icon-gradient.svg',
    sea: '/logo/icon-sea.svg',
    navy: '/logo/icon-navy.svg',
    slate: '/logo/icon-slate.svg',
  },
  horizontal: {
    light: '/logo/logo-horizontal-light.svg',
    dark: '/logo/logo-horizontal-dark.svg',
    monochromeWhite: '/logo/logo-horizontal-monochrome-white.svg',
    monochromeNavy: '/logo/logo-horizontal-monochrome-navy.svg',
  },
  vertical: {
    light: '/logo/logo-vertical-light.svg',
    dark: '/logo/logo-vertical-dark.svg',
  },
} as const

const logosByTheme = {
  light: {
    app: logos.app.light,
    icon: logos.icon.gradient,
    horizontal: logos.horizontal.light,
    vertical: logos.vertical.light,
    monochrome: logos.horizontal.monochromeNavy,
  },
  dark: {
    app: logos.app.dark,
    icon: logos.icon.navy,
    horizontal: logos.horizontal.dark,
    vertical: logos.vertical.dark,
    monochrome: logos.horizontal.monochromeWhite,
  },
} as const satisfies Record<Theme, ThemeLogos>
*/

const logos = {
  light: {
    icon: '/logo/icone_light_svg_vetorial.svg',
    horizontal: '/logo/logo1.png',
  },
  dark: {
    icon: '/logo/icone_dark_svg_vetorial.svg',
    horizontal: '/logo/logo3.png',
  },
} as const

const logosByTheme = {
  light: {
    app: logos.light.icon,
    icon: logos.light.icon,
    horizontal: logos.light.horizontal,
    vertical: logos.light.horizontal,
    monochrome: logos.light.horizontal,
  },
  dark: {
    app: logos.dark.icon,
    icon: logos.dark.icon,
    horizontal: logos.dark.horizontal,
    vertical: logos.dark.horizontal,
    monochrome: logos.dark.horizontal,
  },
} as const satisfies Record<Theme, ThemeLogos>

interface LogotipoProps extends ImageProps {
  variant?: keyof (typeof logosByTheme)['light']
  theme?: Theme
}

const Logotipo = ({ variant, theme, ...props }: LogotipoProps) => {
  const logotipoTheme = useColorModeValue('light', 'dark')
  const logo = logosByTheme[theme ?? logotipoTheme][variant ?? 'app']

  return <Image src={logo} alt="Agendros" {...props} />
}

export default Logotipo
