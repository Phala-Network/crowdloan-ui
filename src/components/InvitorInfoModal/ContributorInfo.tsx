import React from 'react'
import { useMeta } from '@/utils/meta'
import styled from 'styled-components'
import { useIntl } from 'gatsby-plugin-intl'
import { useClipboard, useToasts } from '@geist-ui/react'
import useShareLink from '@/hooks/useShareLink'
import { useI18n } from '@/i18n'

const PrimaryColorSpan = styled.span`
  color: ${(props) => props.theme.yg01};
`

const CopyStyle = styled.span`
  color: #03ffff;
  cursor: pointer;
`

const Copy = (props) => {
  const { copy } = useClipboard()
  const [, setToast] = useToasts()
  const shareLink = useShareLink()
  const { t } = useI18n()

  return (
    <CopyStyle
      onClick={() => {
        copy(shareLink)
        setToast({
          text: t('copySuccess'),
          type: 'success',
        })
      }}
    >
      {props.children}
    </CopyStyle>
  )
}

const ContributorInfo: React.FC = () => {
  const { currentContributorQuery } = useMeta()
  const { referralsCount, promotionRewardAmount } =
    currentContributorQuery?.data?.contributor || {}
  const { locale } = useIntl()

  if (locale === 'en') {
    return (
      <div>
        You have invited{' '}
        <PrimaryColorSpan>{referralsCount ?? 0}</PrimaryColorSpan> people, and
        you are currently rewarded with an additional{' '}
        <PrimaryColorSpan>{promotionRewardAmount ?? 0}</PrimaryColorSpan> PHA,{' '}
        <Copy>click</Copy> to generate your referral link.
      </div>
    )
  } else {
    return (
      <div>
        您邀请了 <PrimaryColorSpan>{referralsCount ?? 0}</PrimaryColorSpan>{' '}
        人，目前为您额外带来{' '}
        <PrimaryColorSpan>{promotionRewardAmount ?? 0}</PrimaryColorSpan>{' '}
        PHA奖励，<Copy>点击</Copy>生成您的邀请链接。
      </div>
    )
  }
}

export default ContributorInfo
