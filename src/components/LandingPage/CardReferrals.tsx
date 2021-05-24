import { Grid } from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import ContentCard from './ContentCard'
import PageHeaderButton from './PageHeaderButton'

const Content = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #070707;
`

const Image = styled.div`
  width: 106px;
  height: 100px;
  background-image: url('/landing/referrals.svg');
  margin: auto;
`

const CardReferrals: React.FC = () => {
  return (
    <ContentCard type="vertical" name={['REFERRALS']} index={2}>
      <Grid.Container gap={3}>
        <Grid sm={17} md={17} xs={24}>
          <div>
            <Content>
              There is an additional reward available for Referrals. If a
              Crowdloan participant invites an additional participant who makes
              an additional contribution, they will each receive an additional
              reward: an extra 0.5% on the additional contribution.
            </Content>
            <PageHeaderButton
              style={{ marginTop: 30 }}
              color="black"
              hasArrowIcon
              size="middle"
            >
              Connect Kusama First
            </PageHeaderButton>
          </div>
        </Grid>
        <Grid sm={7} md={7} xs={24}>
          <Image></Image>
        </Grid>
      </Grid.Container>
    </ContentCard>
  )
}

export default CardReferrals
