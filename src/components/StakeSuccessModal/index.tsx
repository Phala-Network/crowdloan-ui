import React, { useEffect } from 'react'
import { useWeb3 } from '@/utils/web3'
import { Divider, Modal, useModal } from '@geist-ui/react'
import styled from 'styled-components'
import { useI18n } from '@/i18n'
import { useIntl } from 'gatsby-plugin-intl'
import { useQuery } from 'react-query'
import { GetContributionsResponse } from '@/utils/request/types'
import { useMeta } from '@/utils/meta'
import useTwitterLink from '@/hooks/useTwitterLink'
import ModalTitle from '@/components/ModalTitle'
import NormalButton from '@/components/NormalButton'
import ModalActions from '@/components/ModalActions'
import gtag from '../../utils/gtag'

type Props = {
  modalProps: ReturnType<typeof useModal>
  blockId?: string
}

const Link = styled.span`
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
  const twitterLink = useTwitterLink()
  const { data, refetch } = useQuery<GetContributionsResponse>([
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

  useEffect(() => {
    refetch()
  }, [modalProps.visible])

  const openTwitter = () => {
    gtag('click', {
      position: 'staking success modal',
      type: 'Twitter Link',
    })

    window.open(twitterLink)
  }

  const openDetail = () => {
    gtag('click', {
      position: 'staking success modal',
      type: 'Detail Link',
    })

    window.open(link)
  }

  return (
    <Modal {...modalProps.bindings}>
      <ModalTitle {...modalProps.bindings}>{t('success')}</ModalTitle>
      <Modal.Content>
        {locale === 'zh' && (
          <div>
            <div>感谢您的支持！</div>
            <div>
              <Link onClick={openDetail}>点击</Link>
              可查看本笔支持详情
            </div>
            <Divider></Divider>
            <div>
              <Link onClick={openTwitter}>发推</Link>{' '}
              邀请您的朋友贡献，您将获得他们支持奖励 0.5％ 的等值奖励。
            </div>
          </div>
        )}

        {locale === 'en' && (
          <div>
            <div>Thanks for your support！</div>
            <div>
              <Link onClick={openDetail}>Click</Link> to view the support
              details.
            </div>
            <Divider></Divider>
            <div>
              <Link onClick={openTwitter}>Tweet</Link> to invite your friends to
              contribute and you will each receive an additional reward: an
              extra 0.5% on the additional contribution.
            </div>
          </div>
        )}
      </Modal.Content>
      <ModalActions>
        <NormalButton primary auto onClick={() => modalProps.setVisible(false)}>
          {t('ok')}
        </NormalButton>
      </ModalActions>
    </Modal>
  )
}

export default StakeSuccessModal
