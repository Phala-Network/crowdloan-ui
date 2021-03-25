import Navbar from '@/components/Navbar'
import PageBase from '@/components/PageBase'
import Section from '@/components/Section'
import { Grid } from '@geist-ui/react'
import { NextPage } from 'next'
import React from 'react'
import { css } from 'styled-components'

const style__StakeActionSection = css`
  background: linear-gradient(106.53deg, rgba(209, 255, 82, 0.2) 0%, rgba(100, 238, 172, 0.2) 100%), #222222;
`

const StakeActionSection = () => <Section className="StakeActionSection" xs={24} md={12} lg={8} innerStyle={style__StakeActionSection}>
  Stake Action
</Section>

const StakeInfoSection = () => <Section className="StakeInfoSection" xs={24} md={12} lg={8}>
  Stake Info
</Section>

const AuctionChartSection = () => <Section className="AuctionChartSection" xs={24} md={12} lg={24}>
  AuctionChartSection
</Section>

const PriceChartSection = () => <Section className="PriceChartSection" xs={24} md={12} lg={24}>
  PriceChartSection
</Section>

const RankSection = () => <Section className="RankSection" xs={24}>
  Rank
</Section>

const Home: NextPage = () => {
  return <>
    <Navbar />
    <PageBase>
      <StakeActionSection />
      <StakeInfoSection />
      <Grid xs={24} md={24} lg={8}>
        <Grid.Container gap={1} direction="row">
          <AuctionChartSection />
          <PriceChartSection />
        </Grid.Container>
      </Grid>
      <RankSection />
    </PageBase>
  </>
}

export default Home
