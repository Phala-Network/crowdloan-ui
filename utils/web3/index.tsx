import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { ExtentionContext, _defaultContextValue } from './common'

const _Web3Provider = dynamic(() => import('./dynamic'))

const Web3Provider: React.FC = ({ children }) => {
  const { current: hasWindow } = useRef(() => typeof window !== 'undefined')

  return hasWindow ? (
    <_Web3Provider>{children}</_Web3Provider>
  ) : (
    <ExtentionContext.Provider value={_defaultContextValue}>
      {children}
    </ExtentionContext.Provider>
  )
}

export default Web3Provider
