import _LandingPage from '@/components/LandingPage'
import React from 'react'

const LandingPage: React.FC = () => {
  const hasWindow = typeof window !== 'undefined'

  return hasWindow ? <_LandingPage /> : null
}

export default LandingPage
