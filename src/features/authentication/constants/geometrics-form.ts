import type { BoxProps } from '@chakra-ui/react'

interface GeometricShape extends BoxProps {
  name: string
}

const DOT_PATTERN_SPACING = '18px'

export const SHAPES: GeometricShape[] = [
  // Formas grandes de base
  {
    name: 'top-circle',
    top: '-180px',
    left: '30%',
    w: '420px',
    h: '420px',
    borderRadius: 'full',
    bg: 'brand.mint',
  },
  {
    name: 'right-ellipse',
    top: '15%',
    right: '-180px',
    w: '550px',
    h: '380px',
    borderRadius: 'full',
    bg: 'brand.navy',
    transform: 'rotate(-35deg)',
  },
  {
    name: 'bottom-left-circle',
    bottom: '-180px',
    left: '-140px',
    w: '400px',
    h: '400px',
    borderRadius: 'full',
    bg: 'brand.sea',
    opacity: 0.65,
  },
  {
    name: 'bottom-ellipse',
    bottom: '-140px',
    right: '10%',
    w: '480px',
    h: '260px',
    borderRadius: 'full',
    bg: 'brand.navy',
    transform: 'rotate(30deg)',
  },

  // Anéis vazados
  {
    name: 'top-left-ring',
    top: '8%',
    left: '-60px',
    w: '220px',
    h: '220px',
    borderRadius: 'full',
    borderWidth: '28px',
    borderColor: 'brand.sea',
    opacity: 0.5,
  },
  {
    name: 'center-right-ring',
    top: '55%',
    right: '22%',
    w: '120px',
    h: '120px',
    borderRadius: 'full',
    borderWidth: '14px',
    borderColor: 'brand.mint',
    display: { base: 'none', md: 'block' },
  },

  // Semicírculo
  {
    name: 'left-half-circle',
    top: '48%',
    left: '12%',
    w: '160px',
    h: '80px',
    borderTopRadius: 'full',
    bg: 'brand.navy',
    opacity: 0.8,
    transform: 'rotate(-20deg)',
    display: { base: 'none', md: 'block' },
  },

  // Triângulo
  {
    name: 'top-right-triangle',
    top: '6%',
    right: '28%',
    w: '110px',
    h: '100px',
    bg: 'brand.sea',
    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
    transform: 'rotate(18deg)',
    opacity: 0.85,
  },

  // Losango
  {
    name: 'bottom-center-diamond',
    bottom: '18%',
    left: '48%',
    w: '70px',
    h: '70px',
    bg: 'brand.mint',
    transform: 'rotate(45deg)',
    borderRadius: '12px',
    opacity: 0.9,
  },

  // Grade de pontos
  {
    name: 'dot-grid',
    top: '20%',
    left: '66%',
    w: '160px',
    h: '120px',
    opacity: 0.35,
    backgroundImage:
      'radial-gradient(var(--chakra-colors-brand-navy) 2.5px, transparent 2.5px)',
    backgroundSize: `${DOT_PATTERN_SPACING} ${DOT_PATTERN_SPACING}`,
    display: { base: 'none', md: 'block' },
  },

  // Pontos pequenos
  {
    name: 'small-dot-top',
    top: '32%',
    left: '48%',
    w: '22px',
    h: '22px',
    borderRadius: 'full',
    bg: 'brand.navy',
  },
  {
    name: 'small-dot-bottom',
    bottom: '30%',
    right: '8%',
    w: '16px',
    h: '16px',
    borderRadius: 'full',
    bg: 'brand.sea',
  },
  {
    name: 'small-dot-left',
    bottom: '42%',
    left: '26%',
    w: '12px',
    h: '12px',
    borderRadius: 'full',
    bg: 'brand.mint',
  },

  // Sinal de mais
  {
    name: 'plus-sign',
    top: '68%',
    left: '8%',
    w: '40px',
    h: '40px',
    bg: 'brand.navy',
    opacity: 0.6,
    clipPath:
      'polygon(38% 0, 62% 0, 62% 38%, 100% 38%, 100% 62%, 62% 62%, 62% 100%, 38% 100%, 38% 62%, 0 62%, 0 38%, 38% 38%)',
    transform: 'rotate(15deg)',
  },
]
