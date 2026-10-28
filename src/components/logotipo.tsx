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

interface LogotipoProps extends ImageProps {
  variant?: keyof (typeof logosByTheme)['light']
}

const Logotipo = ({ variant, ...props }: LogotipoProps) => {
  const logotipoTheme = useColorModeValue('light', 'dark')
  const logo = logosByTheme[logotipoTheme][variant ?? 'app']

  return <Image src={logo} alt="Logo" {...props} />
}

export default Logotipo
