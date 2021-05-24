import React from 'react'
import Navbar from '@/components/Navbar'
import PageHeader from './PageHeader'
import styled from 'styled-components'
import { PageStyle } from './PageStyle'
import BgLayer from './BgLayer'
import PageHeaderButtons from './PageHeaderButtons'
import PageHeaderButton from './PageHeaderButton'
import InvitedNumber from './InvitedNumber'
import ContentCard from './ContentCard'

const Page = styled.div`
  width: 100%;
  padding-top: 250px;
  padding-bottom: 200px;
  position: relative;
`

const Container = styled.div`
  max-width: 1350px;
  padding-right: 20px;
  padding-left: 20px;
  margin: auto;
  min-height: 100vh;
`

const LandingPage: React.FC = () => {
  return (
    <BgLayer backgroundUrl="/landing/bg.jpg">
      <PageStyle></PageStyle>
      <Navbar
        color="#03FFFF"
        logo="/landing/logo.png"
        hasAffiliationProgramLink={false}
      />
      <Page>
        <Container>
          <PageHeader
            title={'Khala’s Crowdloan Dapp is Comming！'}
            description={
              'Please bookmark this page, Khala will open Crowdloan on this page in the second round of the Kusama auction'
            }
          />
          <PageHeaderButtons>
            <PageHeaderButton color="primary" size="middle">
              Referral Reward
            </PageHeaderButton>
            <InvitedNumber></InvitedNumber>
            <PageHeaderButton color="gray" hasArrowIcon size="middle">
              Subscribe our crowdloan news
            </PageHeaderButton>
            <PageHeaderButton color="gray" hasArrowIcon size="middle">
              Telegram
            </PageHeaderButton>
          </PageHeaderButtons>

          <ContentCard type="vertical" name={['Basic Reward']} index={1}>
            Basic Reward
          </ContentCard>
          <ContentCard type="vertical" name={['Referrals']} index={2}>
            Referrals
          </ContentCard>
          <ContentCard type="vertical" name={['Process']} index={3}>
            Process
          </ContentCard>
          <ContentCard type="vertical" name={['ways', 'to support']} index={4}>
            ways to support
          </ContentCard>
          <ContentCard type="vertical" name={['Q&A']} index={5}>
            Q&A
          </ContentCard>
        </Container>
      </Page>
    </BgLayer>
  )
}

export default LandingPage
