import React from 'react'
import { useWeb3 } from '@/utils/web3'
import { Divider, Modal } from '@geist-ui/react'
import { ModalProps } from '@geist-ui/react/dist/modal/modal'
import styled from 'styled-components'
import { useI18n } from '@/i18n'
import { useIntl } from 'gatsby-plugin-intl'
import { useQuery } from 'react-query'
import { GetContributionsResponse } from '@/utils/request/types'
import { useMeta } from '@/utils/meta'

type Props = {
  modalProps: Partial<ModalProps>
  blockId?: string
}

const Link = styled.a`
  color: ${(props) => props.theme.yg01};

  &:hover {
    opacity: 0.8;
  }
`

const StakeSuccessModal: React.FC<Props> = (props) => {
  const { currentAccount } = useWeb3()
  const currentAccountAddress = currentAccount?.address
  const { modalProps } = props
  const { t } = useI18n()
  const { campaignId } = useMeta()
  const { locale } = useIntl()
  const twitterText =
    'Make Phala Great Again!' +
    '&url=' +
    process.env.WEBSITE_URL +
    '%3Finvitor%3D' +
    currentAccountAddress +
    '&via=PhalaNetwork' +
    '&hashtags=blockchain,Phala' +
    '&related=twitterapi%2Ctwitter' +
    '&original_referer=https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview'
  const twitterLink = `https://twitter.com/intent/tweet?text=${twitterText}`
  const { data } = useQuery<GetContributionsResponse>([
    'getContributions',
    {
      perPage: 1,
      page: 1,
      contributor: currentAccountAddress,
      campaignId,
    },
  ])

  const blockId = data?.contributions?.[0]?.onChainHash || '7551103'
  const link = `https://kusama.subscan.io/block/${blockId}`

  return (
    <Modal {...modalProps}>
      <Modal.Title>{t('success')}</Modal.Title>
      <Modal.Content>
        {locale === 'zh' && (
          <div>
            <div>感谢您的支持！</div>
            <div>
              <Link target="_blank" href={link}>
                点击
              </Link>
              可查看本笔支持详情
            </div>
          </div>
        )}

        {locale === 'en' && (
          <div>
            <div>Thanks for your support!</div>
            <div>
              <Link target="_blank" href={link}>
                Click
              </Link>{' '}
              to view the support details
            </div>
            <Divider></Divider>
            <div>
              <Link target="_blank" href={twitterLink}>
                Tweet
              </Link>{' '}
              to invite your friend to contribute, each will receive an
              additional reward: an extra 0.5% on the additional contribution.
            </div>
          </div>
        )}
      </Modal.Content>
      <Modal.Action passive onClick={modalProps.onClose}>
        {t('ok')}
      </Modal.Action>
    </Modal>
  )
}

export default StakeSuccessModal
