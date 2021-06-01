import { useWeb3 } from '@/utils/web3'

export default function useShareLink(): string {
  const { currentAccount } = useWeb3()
  const currentAccountAddress = currentAccount?.address

  if (!currentAccountAddress) return ''

  return (
    location.origin + location.pathname + '?invitor=' + currentAccountAddress
  )
}
