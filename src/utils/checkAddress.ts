import { decodeAddress } from '@polkadot/util-crypto'

export default function checkAddress(address: string): boolean {
  let result = false

  try {
    decodeAddress(address)
    result = true
  } catch (error) {
    result = false
  }

  return result
}
