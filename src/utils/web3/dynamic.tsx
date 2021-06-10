import React, { useCallback, useMemo, useEffect, useState } from 'react'
import type { useModal } from '@geist-ui/react'
import { useLocalStorage } from 'react-use'
import {
  ExtensionContextValue,
  ExtentionContext,
  ERR_POLKADOT_WEB3_NOT_INJECTED,
  POLKADOT_WEB3_APP_NAME,
} from './common'
import {
  InjectedAccountWithMeta,
  InjectedExtension,
} from '@polkadot/extension-inject/types'
import {
  web3Accounts,
  web3FromSource,
  isWeb3Injected,
  web3AccountsSubscribe,
  web3Enable,
} from '@polkadot/extension-dapp'
import polkadotJsAccountFilter from './polkadotJsAccountFilter'
import { Keyring } from '@polkadot/api'

const _Web3Provider: React.FC<{
  modal: ReturnType<typeof useModal>
}> = ({ children, modal }) => {
  const [isEnabled, setIsEnabled] =
    useState<ExtensionContextValue['isEnabled']>(false)
  const [error, setError] = useState<ExtensionContextValue['error']>()

  const [enableCount, setEnableCount] = useState<number>(-1)
  const enable = useCallback(
    () => setEnableCount(enableCount + 1),
    [enableCount]
  )

  const [currentAccount, setCurrentAccount] =
    useState<InjectedAccountWithMeta>()
  const [currentInjector, setCurrentInjector] = useState<InjectedExtension>()

  const [extensions, setExtensions] = useState<
    ExtensionContextValue['extensions']
  >([])
  const [accounts, setAccounts] = useState<ExtensionContextValue['accounts']>(
    []
  )
  const [currentAccountLocal, setCurrentAccountLocal] =
    useLocalStorage<{ address: string }>('currentAccount')

  useEffect(() => {
    ;(async () => {
      if (typeof window === 'undefined') {
        return
      }
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
          web3Accounts().then(async (accounts) => {
            const keyring = new Keyring()

            accounts.map((item) => keyring.addFromAddress(item.address))

            console.warn('keyring.getPairs()', keyring.getPairs())

            return setAccounts(polkadotJsAccountFilter(accounts))
          })
          unsubscribe = await web3AccountsSubscribe((accounts) =>
            setAccounts(polkadotJsAccountFilter(accounts))
          )
        }
      })()
    }

    return () => unsubscribe?.()
  }, [enableCount])

  useEffect(() => {
    const lastLoginAccount = accounts.find(
      (item) => item.address === currentAccountLocal?.address
    )

    setCurrentAccount(lastLoginAccount)
  }, [accounts])

  useEffect(() => {
    ;(async () => {
      if (currentAccount?.meta.source) {
        setCurrentAccountLocal(currentAccount)
        setCurrentInjector(await web3FromSource(currentAccount.meta.source))
      }
    })()
  }, [currentAccount])

  const [callbackRef, setCallbackRef] = useState(null)
  const openModal = useCallback(
    (_callbackRef?) => {
      if (_callbackRef) {
        setCallbackRef(_callbackRef)
      }
      modal.setVisible(true)
    },
    [setCallbackRef]
  )

  const contextValue = useMemo<ExtensionContextValue>(
    () => ({
      enable,
      error,
      isEnabled,
      extensions,
      accounts,
      accountModal: modal,
      openModal,
      currentAccount,
      currentInjector,
      setCurrentAccount,
      modalBindings: {
        modal,
        accounts,
        setCurrentAccount,
        isEnabled,
        callbackRef,
        setCallbackRef,
      },
      callbackRef,
      setCallbackRef,
    }),
    [
      enable,
      error,
      isEnabled,
      extensions,
      accounts,
      modal,
      currentAccount,
      currentInjector,
      callbackRef,
      setCallbackRef,
    ]
  )
  return (
    <ExtentionContext.Provider value={contextValue}>
      {children}
    </ExtentionContext.Provider>
  )
}

export default _Web3Provider
