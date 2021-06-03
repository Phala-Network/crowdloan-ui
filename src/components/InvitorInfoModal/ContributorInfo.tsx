import React from 'react'
import { useMeta } from '@/utils/meta'
import styled from 'styled-components'

const PrimaryColorSpan = styled.span`
  color: ${(props) => props.theme.yg01};
`

const ContributorInfo: React.FC = () => {
  const { currentContributorQuery } = useMeta()
  const { referralsCount, rewardAmount } =
    currentContributorQuery?.data?.contributor || {}

  return (
    <div>
      您邀请了 <PrimaryColorSpan>{referralsCount ?? 0}</PrimaryColorSpan>{' '}
      人，目前为您额外带来{' '}
      <PrimaryColorSpan>{rewardAmount ?? 0}</PrimaryColorSpan> PHA奖励
    </div>
  )
}

export default ContributorInfo
