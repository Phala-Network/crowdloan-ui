import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  ExtentionContext,
  _defaultContextValue,
  ExtensionContextValue,
  AccountModal,
} from './common'
import { useModal } from '@geist-ui/react'

const _Web3Provider = React.lazy(() => import('./dynamic'))
const Web3Provider: React.FC = ({ children }) => {
  const { current: hasWindow } = useRef(typeof window !== 'undefined')
  const [_Web3Provider, setDynWeb3Provider] = useState(undefined)

  // useEffect(() => {
  //   if (hasWindow && !_Web3Provider) {
  //     ;(async () => {
  //       setDynWeb3Provider()
  //     })()
  //   }
  // }, [hasWindow])

  const accountModal = useModal()

  const value = useMemo(
    () => ({
      ..._defaultContextValue,
      accountModal,
      openModal: () => accountModal.setVisible(true),
    }),
    [accountModal]
  )
  console.log(111,_Web3Provider)

  return (
    <>
      {typeof _Web3Provider !== 'undefined' ? (
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
