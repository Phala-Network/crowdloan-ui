import React, { useContext, useMemo, useRef } from 'react'
import {
  ExtentionContext,
  _defaultContextValue,
  ExtensionContextValue,
  AccountModal,
} from './common'
import { useModal } from '@geist-ui/react'
import dynamic from 'next/dynamic'

const Web3Provider: React.FC = ({ children }) => {
  const { current: hasWindow } = useRef(typeof window !== 'undefined')
  const { current: _Web3Provider } = useRef(
    hasWindow ? dynamic(() => import('./dynamic'), { ssr: false }) : null
  )
  const accountModal = useModal()

  const value = useMemo(
    () => ({
      ..._defaultContextValue,
      accountModal,
      openModal: () => accountModal.setVisible(true),
    }),
    [accountModal]
  )

  return (
    <>
      {hasWindow ? (
        <_Web3Provider modal={accountModal}>{children}</_Web3Provider>
      ) : (
        <ExtentionContext.Provider value={value}>
          <AccountModal isEnabled={true} modal={accountModal} />
          {children}
        </ExtentionContext.Provider>
      )}
    </>
  )
}

export const useWeb3 = (): ExtensionContextValue => useContext(ExtentionContext)

export default Web3Provider
