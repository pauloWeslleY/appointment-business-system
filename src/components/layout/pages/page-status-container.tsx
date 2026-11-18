import { chakra, Container } from '@chakra-ui/react'
import { type ReactNode } from 'react'

const WrapperStatusPage = chakra('main', {
  className: 'wrapper-status-page',
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minH: 'dvh',
    py: { base: '4', lg: '10' },
  },
})

export const PageStatusContainer = ({ children }: { children: ReactNode }) => {
  return (
    <WrapperStatusPage>
      <Container maxW="breakpoint-lg">{children}</Container>
    </WrapperStatusPage>
  )
}
