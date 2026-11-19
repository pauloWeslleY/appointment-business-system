import type { BoxProps } from '@chakra-ui/react'

interface GeometricShapeLayout extends BoxProps {
  name: string
}

export const GEOMETRICS_LAYOUT: GeometricShapeLayout[] = [
  // Anéis concêntricos
  {
    name: 'concentric-rings',
    top: '38%',
    right: '4%',
    w: '180px',
    h: '180px',
    borderRadius: 'full',
    opacity: 0.4,
    backgroundImage:
      'repeating-radial-gradient(circle, transparent 0 14px, var(--chakra-colors-brand-sea) 14px 20px)',
    display: { base: 'none', md: 'block' },
  },

  // Meio anel
  {
    name: 'half-ring',
    bottom: '8%',
    left: '18%',
    w: '200px',
    h: '100px',
    borderTopRadius: 'full',
    borderWidth: '22px',
    borderBottomWidth: '0',
    borderColor: 'brand.mint',
    transform: 'rotate(160deg)',
    opacity: 0.8,
  },

  // Quarto de círculo
  {
    name: 'quarter-circle',
    top: '0',
    left: '0',
    w: '140px',
    h: '140px',
    borderBottomRightRadius: 'full',
    bg: 'brand.navy',
    opacity: 0.85,
  },

  // Listras diagonais
  {
    name: 'diagonal-stripes',
    top: '12%',
    left: '62%',
    w: '140px',
    h: '140px',
    borderRadius: 'full',
    opacity: 0.45,
    backgroundImage:
      'repeating-linear-gradient(45deg, var(--chakra-colors-brand-navy) 0 4px, transparent 4px 14px)',
  },

  // Quadrado vazado
  {
    name: 'outlined-square',
    bottom: '26%',
    right: '34%',
    w: '90px',
    h: '90px',
    borderWidth: '10px',
    borderColor: 'brand.navy',
    borderRadius: '16px',
    transform: 'rotate(-22deg)',
    opacity: 0.7,
    display: { base: 'none', md: 'block' },
  },

  // Triângulos
  {
    name: 'bottom-left-triangle',
    bottom: '34%',
    left: '3%',
    w: '80px',
    h: '70px',
    bg: 'brand.mint',
    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
    transform: 'rotate(-28deg)',
  },
  {
    name: 'right-small-triangle',
    top: '72%',
    right: '18%',
    w: '50px',
    h: '44px',
    bg: 'brand.navy',
    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
    transform: 'rotate(40deg)',
    opacity: 0.75,
  },

  // Hexágono
  {
    name: 'hexagon',
    top: '24%',
    left: '24%',
    w: '90px',
    h: '80px',
    bg: 'brand.sea',
    clipPath: 'polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)',
    opacity: 0.55,
    display: { base: 'none', md: 'block' },
  },

  // Estrela
  {
    name: 'star',
    top: '58%',
    left: '56%',
    w: '56px',
    h: '56px',
    bg: 'brand.mint',
    clipPath:
      'polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    transform: 'rotate(12deg)',
  },

  // Zigue-zague
  {
    name: 'zigzag',
    top: '82%',
    left: '44%',
    w: '160px',
    h: '24px',
    opacity: 0.6,
    backgroundImage:
      'linear-gradient(135deg, var(--chakra-colors-brand-navy) 25%, transparent 25%), linear-gradient(225deg, var(--chakra-colors-brand-navy) 25%, transparent 25%)',
    backgroundSize: '24px 24px',
    display: { base: 'none', md: 'block' },
  },

  // Barra arredondada
  {
    name: 'pill',
    top: '4%',
    left: '8%',
    w: '120px',
    h: '28px',
    borderRadius: 'full',
    bg: 'brand.sea',
    transform: 'rotate(-30deg)',
    opacity: 0.8,
  },

  // Sinal de mais menor
  {
    name: 'small-plus-sign',
    top: '16%',
    right: '12%',
    w: '28px',
    h: '28px',
    bg: 'brand.mint',
    clipPath:
      'polygon(38% 0, 62% 0, 62% 38%, 100% 38%, 100% 62%, 62% 62%, 62% 100%, 38% 100%, 38% 62%, 0 62%, 0 38%, 38% 38%)',
    transform: 'rotate(-10deg)',
  },

  // Anel pequeno
  {
    name: 'small-ring',
    bottom: '12%',
    right: '42%',
    w: '48px',
    h: '48px',
    borderRadius: 'full',
    borderWidth: '8px',
    borderColor: 'brand.sea',
  },

  // Pontos extras
  {
    name: 'small-dot-center',
    top: '48%',
    left: '36%',
    w: '14px',
    h: '14px',
    borderRadius: 'full',
    bg: 'brand.sea',
  },
  {
    name: 'small-dot-top-right',
    top: '10%',
    right: '6%',
    w: '20px',
    h: '20px',
    borderRadius: 'full',
    bg: 'brand.navy',
    opacity: 0.7,
  },
  {
    name: 'small-dot-bottom-left',
    bottom: '6%',
    left: '6%',
    w: '18px',
    h: '18px',
    borderRadius: 'full',
    bg: 'brand.mint',
  },
]
