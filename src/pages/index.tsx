import Navbar from '@/components/Navbar'
import styled from 'styled-components'
import PageBase from '@/components/PageBase'
import { Grid, Modal } from '@geist-ui/react'
import React, { useMemo } from 'react'
import StakeActionSection from '@/components/StakeActionSection'
import StakeInfoSection from '@/components/StakeInfoSection'
import RankSection from '@/components/RankSection'
import AuctionChartSection from '@/components/AuctionChartSection'
import PriceChartSection from '@/components/PriceChartSection'

import BlackModal from '@/components/BlackModal'

import { useI18n } from '@/i18n'

const StyledContainer = styled(Grid.Container)`
  .item {
    width: 100%;
  }
`

const _Home: React.FC = () => {
  const { t } = useI18n()
  return (
    <>
      <Navbar />
      <PageBase>
        <StakeActionSection />
        <StakeInfoSection />
        <Grid xs={24} md={24} lg={8}>
          <StyledContainer gap={1} direction="row">
            <AuctionChartSection />
            <PriceChartSection
              ksmInitialData={undefined}
              phaInitialData={undefined}
            />
          </StyledContainer>
        </Grid>
        <RankSection />
      </PageBase>
      <BlackModal>
        <Modal.Title>邀请奖励</Modal.Title>
        <Modal.Content>
          <p>
            除质押奖池外，邀请好友来为 Phala 质押
            KSM，双方都将获得一定比例的额外奖励。被邀请人在第一次质押后不得再更改邀请人。
          </p>
        </Modal.Content>
        <Modal.Action className="passive" onClick={({ close }) => close()}>
          放弃使用
        </Modal.Action>
        <Modal.Action onClick={({ close }) => close()}>明白了</Modal.Action>
      </BlackModal>
      <BlackModal>
        <Modal.Title>请您确认</Modal.Title>
        <Modal.Content>
          <p>
            您将在 Kusama 卡槽拍卖中为 Phala 质押{' '}
            <span className="green">123,321</span>KSM 直到{' '}
            <span className="green">2021年4月30日；</span>
          </p>
          <p>
            您的邀请人是{' '}
            <span className="green">
              42FEJpvDMyTxHPTjGXt5TDC5FSefVqwrhADngAZC9UYqCFht；
            </span>{' '}
            解锁 <span className="green">？百分比</span>，之后每隔
            <span className="green">？时间</span>解锁
            <span className="green">？百分比；</span>
          </p>
          <p>
            届时您可以通过您的<span className="green">KSM地址</span>
            领取奖励，详情请关注本页面或Phala社区；
          </p>
          <p>
            在阁下申请与我们开始交易之前，必须小心地考虑以阁下的情况以及财务处境，使用差价合约是否适合。
          </p>
        </Modal.Content>
        <Modal.Action className="passive" onClick={({ close }) => close()}>
          放弃使用
        </Modal.Action>
        <Modal.Action onClick={({ close }) => close()}>明白了</Modal.Action>
      </BlackModal>
      <BlackModal>
        <Modal.Title>感谢您的支持</Modal.Title>
        <Modal.Content>
          <p>
            <a>点击</a>可查看本笔质押详情
          </p>
          <p>转发朋友圈，邀请朋友为Phala质押，一起获得额外奖励</p>
        </Modal.Content>
        <Modal.Action className="passive" onClick={({ close }) => close()}>
          放弃使用
        </Modal.Action>
        <Modal.Action onClick={({ close }) => close()}>明白了</Modal.Action>
      </BlackModal>
    </>
  )
}

const Home: React.FC = () => {
  const hasWindow = useMemo(() => typeof window !== 'undefined', [
    typeof window !== 'undefined',
  ])
  return hasWindow ? <_Home /> : null
}

export default Home
