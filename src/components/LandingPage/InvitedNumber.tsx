import React from 'react'
import styled from 'styled-components'
import { useMeta } from '@/utils/meta'

const InvitedNumberRoot = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 38px;
  height: 38px;
  color: #d9d9d9;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 25px;
    height: 25px;
  }
`

const InvitedNumber: React.FC = () => {
  const { campaignQuery } = useMeta()

  const amount = campaignQuery?.data?.meta?.totalInvitedCount

  return (
    <InvitedNumberRoot>
      {amount >= 1000 ? `${amount} invited` : ''}
    </InvitedNumberRoot>
  )
}

export default InvitedNumber
