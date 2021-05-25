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
import ContentCard from './ContentCard'
import PageHeaderButton from './PageHeaderButton'
import useTwitterLink from '@/hooks/useTwitterLink'
import useShareLink from '@/hooks/useShareLink'
import { useI18n } from '@/i18n'
import { useMeta } from '@/utils/meta'

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
  const { currentContributorQuery } = useMeta()
  const contributorAmount = currentContributorQuery?.data?.contributor?.amount
  const twitterLink = useTwitterLink()
  const shareLink = useShareLink()
  const { copy } = useClipboard()
  const [, setToast] = useToasts()
  const { t } = useI18n()

  return (
    <ContentCard type="vertical" name={['REFERRALS']} index={2}>
      <Grid.Container gap={3}>
        <Grid sm={17} md={17} xs={24}>
          {!currentAccount && (
            <div>
              <Content>
                There is an additional reward available for Referrals. If a
                Crowdloan participant invites an additional participant who
                makes an additional contribution, they will each receive an
                additional reward: an extra 0.5% on the additional contribution.
              </Content>

              <PageHeaderButton
                style={{ marginTop: 30 }}
                color="black"
                hasArrowIcon
                size="middle"
                onClick={() => openModal()}
              >
                Connect Kusama First
              </PageHeaderButton>
            </div>
          )}
          {currentAccount && (
            <div>
              <Content>
                First, you can Bond your invitor, when you help Khala to win the
                auction, you will get a bonus reward equivalent to 0.5% of your
                support reward.
              </Content>
              <Spacer y={1}></Spacer>
              <Content>
                Second, you can invite your friends, if they help Khala to win
                the auction, you will you will get a bonus reward equivalent to
                0.5% of your friend’s support reward. there is no limit of how
                many address you invite.
              </Content>

              <Spacer y={2}></Spacer>

              <Container>
                <a href={twitterLink} target="_blank" rel="noreferrer">
                  <PageHeaderButton color="sp1" size="middle">
                    Tweet to tell your friend
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
                  Generate my referal link
                </PageHeaderButton>
              </Container>

              <Spacer y={1}></Spacer>

              {contributorAmount && (
                <Content>You have invited {contributorAmount} friend!</Content>
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
