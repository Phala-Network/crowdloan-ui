import { web3Accounts } from '@polkadot/extension-dapp'

export interface InjectedAccountExt {
  address: string
  meta: {
    name: string
    source: string
    whenCreated: number
  }
}

export default async function getInjectedAccounts(): Promise<
  InjectedAccountExt[]
> {
  try {
    const accounts = await web3Accounts()

    return accounts.map(
      ({ address, meta }, whenCreated): InjectedAccountExt => ({
        address,
        meta: {
          ...meta,
          name: `${meta.name || 'unknown'} (${
            meta.source === 'polkadot-js' ? 'extension' : meta.source
          })`,
          whenCreated,
        },
      })
    )
  } catch (error) {
    console.error('web3Accounts', error)

    return []
  }
}
