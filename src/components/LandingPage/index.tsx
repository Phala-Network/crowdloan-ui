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
import EmailSubscribeButton from './EmailSubscribeButton'
import { useI18n } from '@/i18n'
import { Spacer } from '@geist-ui/react'

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
  const { t } = useI18n()

  return (
    <BgLayer noMask={true} backgroundUrl={`/landing/bg-${locale}.jpg`}>
      <PageStyle></PageStyle>
      <Navbar
        color={color}
        logo="/landing/logo.png"
        hasAffiliationProgramLink={false}
      />
      <Page>
        <Container>
          <PageHeader
            title={t('landingPageTitle')}
            description={t('landingPageDescription')}
          >
            <Spacer y={3}></Spacer>

            <PageHeaderButtons>
              <PageHeaderButton
                color="primary"
                size="middle"
                onClick={() =>
                  scrollIntoView(
                    document.getElementById('ReferralRewardsCard'),
                    {
                      behavior: 'smooth',
                      block: 'start',
                    }
                  )
                }
              >
                {t('landingPageReferralRewards')}
              </PageHeaderButton>

              <InvitedNumber></InvitedNumber>
            </PageHeaderButtons>

            <PageHeaderButtons>
              <EmailSubscribeButton></EmailSubscribeButton>

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
          <div id="ReferralRewardsCard"></div>
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
