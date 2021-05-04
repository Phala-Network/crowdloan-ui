import React, { useEffect, useState } from 'react'
import type { Balance, AccountId } from '@polkadot/types/interfaces'
import { usePolkadotApi } from '.'

export const useBalance = (
  address?: string | AccountId | Uint8Array
): Balance => {
  const { api, initialized } = usePolkadotApi()
  const [balance, setBalance] = useState<Balance>()

  useEffect(() => {
    if (!address) {
      return
    }
    if (!initialized) {
      return
    }
    let unsubscribe
    ;(async () => {
      unsubscribe = await api.query.system.account(
        address,
        ({ data: { free } }) => {
          setBalance(free)
        }
      )
    })()

    return unsubscribe && unsubscribe()
  }, [api, initialized, address])

  return balance
}
