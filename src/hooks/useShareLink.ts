import { useWeb3 } from '@/utils/web3'

export default function useShareLink(): string {
  const { currentAccount } = useWeb3()
  const currentAccountAddress = currentAccount?.address

  if (!currentAccountAddress) return ''

  return process.env.WEBSITE_URL + '%3Finvitor%3D' + currentAccountAddress
}
