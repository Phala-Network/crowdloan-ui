import React, { useCallback, useMemo, useEffect, useState } from 'react'

import {
  ExtensionContextValue,
  ExtentionContext,
  ERR_POLKADOT_WEB3_NOT_INJECTED,
  POLKADOT_WEB3_APP_NAME,
} from './common'

const _Web3Provider: React.FC = ({ children }) => {
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
            console.log(injectedAccounts)
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
    }),
    []
  )

  return (
    <ExtentionContext.Provider value={contextValue}>
      {children}
    </ExtentionContext.Provider>
  )
}

export default _Web3Provider
