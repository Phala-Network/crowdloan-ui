import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { typesChain, typesBundle } from '@polkadot/apps-config/api'
import type { ChainProperties } from '@polkadot/types/interfaces'
import types from './types.json'

export type PolkadotApiContextValue = {
  api?: ApiPromise
  initialize?: () => any
  initialized: boolean
  chainInfo?: ChainProperties
}

const _defaultValue: PolkadotApiContextValue = {
  api: null,
  initialized: false,
}
export const PolkadotApiContext =
  createContext<PolkadotApiContextValue>(_defaultValue)

const _PolkadotApiProvider: React.FC = ({ children }) => {
  const [initCount, setInitCount] = useState<number>(-1)
  const [initialized, setInitialized] = useState<boolean>(false)
  const [chainInfo, setChainInfo] = useState<ChainProperties>()

  const initialize = useCallback(() => {
    setInitCount(initCount + 1)
  }, [initCount])

  const [api, setApi] = useState(null)

  useEffect(() => {
    if (initCount < 0) {
      return
    }
    if (initialized) {
      return
    }
    let unsub
    ;(async () => {
      const wsProvider = new WsProvider(
        localStorage.getItem('rpc') || process.env.GATSBY_POLKADOT_ENDPOINT
      )
      const _api = await ApiPromise.create({
        provider: wsProvider,
        typesBundle,
        typesChain,
        types,
      })
      setApi(_api)
      await _api.isReady
      setInitialized(true)
      setChainInfo(await _api.registry.getChainProperties())
    })()
    return () => unsub && unsub()
  }, [initCount])

  useEffect(() => {
    initialize()
  }, [])

  const value = useMemo(
    () => ({
      api,
      initialize,
      initialized,
      chainInfo,
    }),
    [api, initialize, initialized, chainInfo]
  )

  return (
    <PolkadotApiContext.Provider value={value}>
      {children}
    </PolkadotApiContext.Provider>
  )
}

export const usePolkadotApi = (): PolkadotApiContextValue =>
  useContext(PolkadotApiContext)

export const PolkadotApiProvider: React.FC = ({ children }) => {
  const { current: hasWindow } = useRef(typeof window !== 'undefined')

  if (!hasWindow) {
    return (
      <PolkadotApiContext.Provider value={_defaultValue}>
        {children}
      </PolkadotApiContext.Provider>
    )
  }
  return <_PolkadotApiProvider>{children}</_PolkadotApiProvider>
}

export default PolkadotApiProvider
