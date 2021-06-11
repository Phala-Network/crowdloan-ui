import { useWeb3 } from '@/utils/web3'
import useShareLink from '@/hooks/useShareLink'
import { useI18n } from '@/i18n'

export default function useTwitterLink(): string {
  const { currentAccount } = useWeb3()
  const shareLink = useShareLink()
  const { t } = useI18n()
  const currentAccountAddress = currentAccount?.address
  const text = t('twitterShareText')

  if (!currentAccountAddress) return ''

  const twitterLink =
    'https://twitter.com/intent/tweet' +
    `?text=${text}` +
    `&url=${shareLink}` +
    // '&via=PhalaNetwork' +
    '&hashtags=Kusama,Khala,Phala'

  return twitterLink
}
