import React, { Suspense, useContext, useMemo, useRef } from 'react'
import {
  ExtentionContext,
  _defaultContextValue,
  ExtensionContextValue,
} from './common'
import { useModal } from '@geist-ui/react'

const _Web3Provider = React.lazy(() => import('./dynamic'))

const Web3Provider: React.FC = ({ children }) => {
  const { current: hasWindow } = useRef(typeof window !== 'undefined')

  const accountModal = useModal()

  const value = useMemo(
    () => ({
      ..._defaultContextValue,
      accountModal,
      openModal: () => accountModal.setVisible(true),
      modalBindings: {
        isEnabled: true,
        modal: accountModal,
      },
    }),
    [accountModal]
  )

  return (
    <>
      {hasWindow ? (
        <Suspense fallback={null}>
          <_Web3Provider modal={accountModal}>{children}</_Web3Provider>
        </Suspense>
      ) : (
        <ExtentionContext.Provider value={value}>
          {children}
        </ExtentionContext.Provider>
      )}
    </>
  )
}

export const useWeb3 = (): ExtensionContextValue => useContext(ExtentionContext)

export default Web3Provider
