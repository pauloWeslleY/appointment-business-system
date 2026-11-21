import { IconButton } from '@chakra-ui/react'
import { ArrowUp } from 'lucide-react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

import { backToTopScrollThreshold } from '../constants/data-landing-page'

const BackToTopButton = () => {
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (pageScrollOffset) => {
    setIsBackToTopVisible(pageScrollOffset > backToTopScrollThreshold)
  })

  if (!isBackToTopVisible) {
    return null
  }

  return (
    <IconButton
      asChild
      pos="fixed"
      right={{ base: '4', md: '6' }}
      bottom={{ base: '4', md: '6' }}
      zIndex="sticky"
      rounded="full"
      boxSize="12"
      bg="brand.navy"
      color="white"
      shadow="md"
      _hover={{ bg: 'navy.800' }}
      _active={{ bg: 'navy.900' }}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'sea.800',
        outlineOffset: '2px',
      }}
    >
      <a href="#inicio" aria-label="Voltar ao topo">
        <ArrowUp size={20} />
      </a>
    </IconButton>
  )
}

export default BackToTopButton
