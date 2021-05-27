import { useWeb3 } from '@/utils/web3'
import useShareLink from '@/hooks/useShareLink'
import { useIntl } from 'gatsby-plugin-intl'

export default function useTwitterLink(): string {
  const { currentAccount } = useWeb3()
  const shareLink = useShareLink()
  const { locale } = useIntl()
  const currentAccountAddress = currentAccount?.address
  const text =
    locale === 'en'
      ? "Khala's participating in the Kusama Parachain Slot Auctions, and you're invited to join in! We'll both get extra rewards if you use my invitate link."
      : 'Khala将参与Kusama平行链卡槽拍卖，邀请你提前注册！填写我的邀请码将有额外奖励哦！'

  if (!currentAccountAddress) return ''

  const twitterLink =
    'https://twitter.com/intent/tweet' +
    `?text=${text}` +
    `&url=${shareLink}` +
    // '&via=PhalaNetwork' +
    '&hashtags=Kusama,Khala' +
    '&original_referer=' +
    location.href

  return twitterLink
}
