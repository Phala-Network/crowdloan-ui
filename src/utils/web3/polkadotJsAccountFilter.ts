import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

type Account = InjectedAccountWithMeta

export default function polkadotJsAccountFilter(
  accounts: Account[]
): Account[] {
  return accounts.filter((account) => account?.meta?.source === 'polkadot-js')
}
