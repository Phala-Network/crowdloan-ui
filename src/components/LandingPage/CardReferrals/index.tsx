import {
  Container,
  Grid,
  Spacer,
  useClipboard,
  useToasts,
} from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import { useWeb3 } from '@/utils/web3'
import ContentCard from '@/components/LandingPage/ContentCard'
import PageHeaderButton from '@/components/LandingPage/PageHeaderButton'
import useTwitterLink from '@/hooks/useTwitterLink'
import useShareLink from '@/hooks/useShareLink'
import { useI18n } from '@/i18n'
import { useMeta } from '@/utils/meta'
import InvitorContent from './InvitorContent'
import { useIntl } from 'gatsby-plugin-intl'

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
  const { openModal, currentAccount } = useWeb3()
  const {
    currentContributorQuery: { data },
  } = useMeta()
  const contributorReferralsCount = data?.contributor?.referralsCount
  const twitterLink = useTwitterLink()
  const shareLink = useShareLink()
  const { copy } = useClipboard()
  const [, setToast] = useToasts()
  const { t } = useI18n()
  const { locale } = useIntl()

  return (
    <ContentCard type="vertical" name={[t('referralRewards')]} index={2}>
      <Grid.Container gap={3}>
        <Grid sm={17} md={17} xs={24}>
          {!currentAccount && (
            <div>
              <Content>{t('referralRewardsText')}</Content>

              <PageHeaderButton
                style={{ marginTop: 30 }}
                color="black"
                hasArrowIcon
                size="middle"
                onClick={() => openModal()}
              >
                {t('referralRewardsConnect')}
              </PageHeaderButton>
            </div>
          )}
          {currentAccount && (
            <div>
              <Content>{t('referralRewardsFirst')}</Content>
              <Spacer y={1}></Spacer>
              <Content>{t('referralRewardsSecond')}</Content>

              <Spacer y={1}></Spacer>

              <InvitorContent></InvitorContent>

              <Spacer y={2}></Spacer>

              <Container>
                <a href={twitterLink} target="_blank" rel="noreferrer">
                  <PageHeaderButton color="sp1" size="middle">
                    {t('tweetToTellYourFriend')}
                  </PageHeaderButton>
                </a>

                <Spacer x={1}></Spacer>

                <PageHeaderButton
                  onClick={() => {
                    copy(shareLink)
                    setToast({
                      text: t('copySuccess'),
                      type: 'success',
                    })
                  }}
                  color="black"
                  size="middle"
                >
                  {t('generateMyReferalLink')}
                </PageHeaderButton>
              </Container>

              <Spacer y={1}></Spacer>

              {contributorReferralsCount > 0 && (
                <Content>
                  {locale === 'en'
                    ? `You have invited ${contributorReferralsCount} friend!`
                    : `您已经邀请 ${contributorReferralsCount} 位朋友`}
                </Content>
              )}
            </div>
          )}
        </Grid>
        <Grid sm={7} md={7} xs={24}>
          <Image></Image>
        </Grid>
      </Grid.Container>
    </ContentCard>
  )
}

export default CardReferrals
