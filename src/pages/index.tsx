import Navbar from '@/components/Navbar'
import styled from 'styled-components'
import PageBase from '@/components/PageBase'
import { Grid } from '@geist-ui/react'
import React, { useMemo } from 'react'
import StakeActionSection from '@/components/StakeActionSection'
import StakeInfoSection from '@/components/StakeInfoSection'
import RankSection from '@/components/RankSection'
import AuctionChartSection from '@/components/AuctionChartSection'
import PriceChartSection from '@/components/PriceChartSection'

const StyledContainer = styled(Grid.Container)`
  .item {
    width: 100%;
  }
`

const _Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <PageBase>
        <StakeActionSection />
        <StakeInfoSection />
        <Grid xs={24} md={24} lg={8}>
          <StyledContainer gap={1} direction="row">
            <AuctionChartSection />
            <PriceChartSection />
          </StyledContainer>
        </Grid>
        <RankSection />
      </PageBase>
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
