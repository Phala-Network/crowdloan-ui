import React from 'react'
import Navbar from '@/components/Navbar'
import PageHeader from './PageHeader'
import styled from 'styled-components'
import { PageStyle } from './PageStyle'
import BgLayer from './BgLayer'
import PageHeaderButtons from './PageHeaderButtons'
import PageHeaderButton from './PageHeaderButton'
import InvitedNumber from './InvitedNumber'
import CardQA from './CardQA'
import CardBasicReward from './CardBasicReward'
import CardReferrals from './CardReferrals'
import CardWaysToSupport from './CardWaysToSupport'
import CardProcess from './CardProcess'
import WechatButton from './WechatButton'
import { useIntl } from 'gatsby-plugin-intl'
import scrollIntoView from 'scroll-into-view-if-needed'
import EmailSubscribe from './EmailSubscribe'

const Page = styled.div`
  width: 100%;
  padding-top: 250px;
  padding-bottom: 200px;
  position: relative;
`

const Container = styled.div`
  max-width: 1390px;
  padding-right: 20px;
  padding-left: 20px;
  margin: auto;
  min-height: 100vh;
`

const LandingPage: React.FC = () => {
  const color = '#03FFFF'
  const { locale } = useIntl()

  return (
    <BgLayer noMask={true} backgroundUrl="/landing/bg.jpg">
      <PageStyle></PageStyle>
      <Navbar
        color={color}
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
          >
            <PageHeaderButtons>
              <PageHeaderButton
                color="primary"
                size="middle"
                onClick={() =>
                  scrollIntoView(document.getElementById('title_REFERRALS'), {
                    behavior: 'smooth',
                    block: 'start',
                  })
                }
              >
                Referral Reward
              </PageHeaderButton>
              <InvitedNumber></InvitedNumber>
              <PageHeaderButton color="gray" hasArrowIcon size="middle">
                Subscribe our crowdloan news
              </PageHeaderButton>

              <EmailSubscribe></EmailSubscribe>

              {locale === 'en' && (
                <a
                  target="_blank"
                  href="https://t.me/phalanetwork"
                  rel="noreferrer"
                >
                  <PageHeaderButton color="gray" hasArrowIcon size="middle">
                    Telegram
                  </PageHeaderButton>
                </a>
              )}

              {locale === 'zh' && <WechatButton color={color}></WechatButton>}
            </PageHeaderButtons>
          </PageHeader>

          <CardBasicReward></CardBasicReward>
          <CardReferrals></CardReferrals>
          <CardProcess></CardProcess>
          <CardWaysToSupport></CardWaysToSupport>
          <CardQA></CardQA>
        </Container>
      </Page>
    </BgLayer>
  )
}

export default LandingPage
