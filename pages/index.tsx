import Navbar from '@/components/Navbar'
import styled from 'styled-components'
import PageBase from '@/components/PageBase'
import { Grid } from '@geist-ui/react'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import StakeActionSection from '@/components/StakeActionSection'
import StakeInfoSection from '@/components/StakeInfoSection'
import RankSection from '@/components/RankSection'
import AuctionChartSection from '@/components/AuctionChartSection'
import PriceChartSection from '@/components/PriceChartSection'
import { I18nProps } from 'next-rosetta'
import { AppLocale } from 'i18n'

const StyledContainer = styled(Grid.Container)`
   .item {
    width:100%;
  }
`

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <PageBase>
        <StakeActionSection />
        <StakeInfoSection />
        <Grid xs={24} md={24} lg={8} >
          <StyledContainer gap={1} direction="row" >
            <AuctionChartSection />
            <PriceChartSection ksmInitialData={undefined} phaInitialData={undefined} />
          </StyledContainer>
        </Grid>
        <RankSection />
      </PageBase>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<I18nProps<AppLocale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { default: table } = await import(`../i18n/${locale}.json`)
  return { props: { table, locale } }
}
