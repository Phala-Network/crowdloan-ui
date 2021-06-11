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
  web3FromSource,
  isWeb3Injected,
  web3Enable,
} from '@polkadot/extension-dapp'
import { keyring } from '@polkadot/ui-keyring'
import { usePolkadotApi } from '../polkadot'
import getInjectedAccounts, { InjectedAccountExt } from '../getInjectedAccounts'

function isKeyringLoaded() {
  try {
    return !!keyring.keyring
  } catch {
    return false
  }
}

interface UseAccounts {
  allAccounts: InjectedAccountExt[]
  areAccountsLoaded: boolean
  hasAccounts: boolean
}

const EMPTY: UseAccounts = {
  allAccounts: [],
  areAccountsLoaded: false,
  hasAccounts: false,
}

const _Web3Provider: React.FC<{
  modal: ReturnType<typeof useModal>
}> = ({ children, modal }) => {
  const [isEnabled, setIsEnabled] =
    useState<ExtensionContextValue['isEnabled']>(false)
  const [error, setError] = useState<ExtensionContextValue['error']>()
  const { api, initialized } = usePolkadotApi()
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
  const [currentAccountLocal, setCurrentAccountLocal] =
    useLocalStorage<{ address: string }>('currentAccount')
  const [stateAccounts, setStateAccounts] = useState<UseAccounts>(EMPTY)

  useEffect(() => {
    ;(async () => {
      if (typeof window === 'undefined') {
        return
      }
      enable()
    })()
  }, [])

  useEffect(() => {
    if (enableCount < 0 || !initialized) {
      return
    }
    if (!isWeb3Injected) {
      setError(ERR_POLKADOT_WEB3_NOT_INJECTED)
      return
    }

    if (!isEnabled) {
      ;(async () => {
        const _extensions = await web3Enable(POLKADOT_WEB3_APP_NAME)

        if (_extensions.length > 0) {
          setIsEnabled(true)
          setError(undefined)
          setExtensions(_extensions)

          if (!isKeyringLoaded()) {
            const injectedAccounts = await getInjectedAccounts()

            keyring.loadAll({ genesisHash: api.genesisHash }, injectedAccounts)
          }
        }
      })()
    }
  }, [enableCount, initialized])

  useEffect(() => {
    const lastLoginAccount = stateAccounts.allAccounts.find(
      (item) => item.address === currentAccountLocal?.address
    )

    setCurrentAccount(lastLoginAccount)
  }, [stateAccounts])

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

  useEffect((): (() => void) => {
    if (!isEnabled) return

    const subscription = keyring.accounts.subject.subscribe(async () => {
      const allAccounts = keyring.getAccounts()
      const hasAccounts = allAccounts.length !== 0
      const injectedAccounts = await getInjectedAccounts()

      setStateAccounts({
        allAccounts: injectedAccounts.filter((account) =>
          allAccounts.some(
            (allAccountsItem) => allAccountsItem.address === account.address
          )
        ),
        areAccountsLoaded: true,
        hasAccounts,
      })
    })

    return (): void => {
      setTimeout(() => subscription.unsubscribe(), 0)
    }
  }, [isEnabled])

  const contextValue = useMemo<ExtensionContextValue>(
    () => ({
      enable,
      error,
      isEnabled,
      extensions,
      accounts: stateAccounts.allAccounts,
      accountModal: modal,
      openModal,
      currentAccount,
      currentInjector,
      setCurrentAccount,
      modalBindings: {
        modal,
        accounts: stateAccounts.allAccounts,
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
      stateAccounts,
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
