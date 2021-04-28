import type {
  InjectedExtension,
  InjectedAccountWithMeta,
} from '@polkadot/extension-inject/types'
import { createContext } from 'react'

export type ExtensionContextValue = {
  enable(): unknown
  error: Error | string | undefined
  isEnabled: boolean
  extensions: InjectedExtension[]
  accounts: InjectedAccountWithMeta[]
}

export const _defaultContextValue: ExtensionContextValue = {
  enable: () => undefined,
  error: undefined,
  isEnabled: false,
  extensions: [],
  accounts: [],
}

export const ExtentionContext = createContext<ExtensionContextValue | null>(
  _defaultContextValue
)

export const ERR_POLKADOT_WEB3_NOT_INJECTED = 'ERR_POLKADOT_WEB3_NOT_INJECTED'

export const POLKADOT_WEB3_APP_NAME =
  process.env.POLKADOT_WEB3_APP_NAME || 'Phala Network'
