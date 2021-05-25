import { useWeb3 } from '@/utils/web3'
import useShareLink from '@/hooks/useShareLink'

export default function useTwitterLink(): string {
  const { currentAccount } = useWeb3()
  const shareLink = useShareLink()
  const currentAccountAddress = currentAccount?.address
  const text = 'Make Phala Great Again!'

  if (!currentAccountAddress) return ''

  const twitterLink =
    'https://twitter.com/intent/tweet' +
    `?text=${text}` +
    `&url=${shareLink}` +
    '&via=PhalaNetwork' +
    '&hashtags=blockchain,Phala' +
    '&original_referer=' +
    process.env.WEBSITE_URL

  return twitterLink
}
