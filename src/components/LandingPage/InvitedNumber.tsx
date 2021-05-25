import React from 'react'
import styled from 'styled-components'
import { useMeta } from '@/utils/meta'
import { useIntl } from 'gatsby-plugin-intl'

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
  const { locale } = useIntl()

  const amount = campaignQuery?.data?.meta?.totalInvitedCount
  const text = locale === 'en' ? `${amount} invited` : `已邀请 ${amount} 人`

  return amount >= 1000 ? <InvitedNumberRoot>{text}</InvitedNumberRoot> : null
}

export default InvitedNumber
