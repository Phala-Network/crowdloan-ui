import React, { useCallback, useMemo, useEffect, useState } from 'react'
import type { useModal } from '@geist-ui/react'

import {
  ExtensionContextValue,
  ExtentionContext,
  ERR_POLKADOT_WEB3_NOT_INJECTED,
  POLKADOT_WEB3_APP_NAME,
  AccountModal,
} from './common'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

const _Web3Provider: React.FC<{
  modal: ReturnType<typeof useModal>
}> = ({ children, modal }) => {
  const [extensionModule, setExtensionModule] = useState({
    isWeb3Injected: null,
    web3AccountsSubscribe: null,
    web3Enable: null,
  })
  const { isWeb3Injected, web3AccountsSubscribe, web3Enable } = extensionModule

  const [isEnabled, setIsEnabled] = useState<
    ExtensionContextValue['isEnabled']
  >(false)
  const [error, setError] = useState<ExtensionContextValue['error']>()

  const [enableCount, setEnableCount] = useState<number>(-1)
  const enable = useCallback(() => setEnableCount(enableCount + 1), [
    enableCount,
  ])

  const [
    currentAccount,
    setCurrentAccount,
  ] = useState<InjectedAccountWithMeta | null>()

  const [extensions, setExtensions] = useState<
    ExtensionContextValue['extensions']
  >([])
  const [accounts, setAccounts] = useState<ExtensionContextValue['accounts']>(
    []
  )

  useEffect(() => {
    ;(async () => {
      setExtensionModule(await import('@polkadot/extension-dapp'))
      enable()
    })()
  }, [])

  useEffect(() => {
    if (enableCount < 0) {
      return
    }
    if (!isWeb3Injected) {
      setError(ERR_POLKADOT_WEB3_NOT_INJECTED)
      return
    }
    let unsubscribe
    if (!isEnabled) {
      ;(async () => {
        const _extensions = await web3Enable(POLKADOT_WEB3_APP_NAME)
        if (_extensions.length > 0) {
          setIsEnabled(true)
          setError(undefined)
          setExtensions(_extensions)
          unsubscribe = await web3AccountsSubscribe((injectedAccounts) => {
            setAccounts(injectedAccounts)
          })
        }
      })()
    }

    return () => unsubscribe && unsubscribe()
  }, [enableCount])

  const contextValue = useMemo<ExtensionContextValue>(
    () => ({
      enable,
      error,
      isEnabled,
      extensions,
      accounts,
      accountModal: modal,
      openModal: () => modal.setVisible(true),
      currentAccount,
    }),
    [enable, error, isEnabled, extensions, accounts, modal, currentAccount]
  )

  return (
    <ExtentionContext.Provider value={contextValue}>
      <AccountModal
        modal={modal}
        accounts={accounts}
        setCurrentAccount={setCurrentAccount}
        isEnabled={isEnabled}
      />
      {children}
    </ExtentionContext.Provider>
  )
}

export default _Web3Provider
