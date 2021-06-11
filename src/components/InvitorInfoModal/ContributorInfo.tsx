import React from 'react'
import { useMeta } from '@/utils/meta'
import styled from 'styled-components'
import { useIntl } from 'gatsby-plugin-intl'

const PrimaryColorSpan = styled.span`
  color: ${(props) => props.theme.yg01};
`

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
        <PrimaryColorSpan>{promotionRewardAmount ?? 0}</PrimaryColorSpan> PHA
      </div>
    )
  } else {
    return (
      <div>
        您邀请了 <PrimaryColorSpan>{referralsCount ?? 0}</PrimaryColorSpan>{' '}
        人，目前为您额外带来{' '}
        <PrimaryColorSpan>{promotionRewardAmount ?? 0}</PrimaryColorSpan>{' '}
        PHA奖励
      </div>
    )
  }
}

export default ContributorInfo
