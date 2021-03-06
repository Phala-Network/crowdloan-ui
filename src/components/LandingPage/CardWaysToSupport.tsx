import { Grid } from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import { useI18n } from '@/i18n'
import ContentCard from './ContentCard'
import { useIntl } from 'gatsby-plugin-intl'

const Item = styled.div`
  background-color: white;
  width: 100%;
  padding: 0 20px 35px 20px;
  text-align: center;
`

const ItemName = styled.div`
  font-family: Lato;
  font-size: 18px;
  line-height: 24px;
  color: #070707;
`

const KhalaLogo = styled.div`
  background-image: url('/landing/khala-logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 204px;
  height: 41px;
`

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 100%;
  position: relative;
`

const LogoMask = styled.div`
  width: 140px;
  height: 40px;
  background-image: url('/landing/logo-mask.svg');
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -70px;
  margin-top: -20px;
`

const CardWaysToSupport: React.FC = () => {
  const { t } = useI18n()
  const { locale } = useIntl()

  return (
    <ContentCard
      type="vertical"
      name={locale === 'en' ? ['WAYS', 'TO SUPPORT'] : ['支持的方式']}
      index={4}
    >
      <Grid.Container gap={3}>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <LogoWrap>
              <KhalaLogo></KhalaLogo>
            </LogoWrap>
            <ItemName>{t('crowdloanDappThisPage')}</ItemName>
          </Item>
        </Grid>
        <Grid sm={0} md={8} xs={0}></Grid>
        <Grid sm={0} md={8} xs={0}></Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <LogoWrap>
              <img src="/landing/1kraken.png" alt="kraken" />
              <LogoMask></LogoMask>
            </LogoWrap>
            <ItemName>{t('toBeAnnounced')}</ItemName>
          </Item>
        </Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <LogoWrap>
              <img src="/landing/3OKEx-black.png" alt="OKEx" />
              <LogoMask></LogoMask>
            </LogoWrap>
            <ItemName>{t('toBeAnnounced')}</ItemName>
          </Item>
        </Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <LogoWrap>
              <img src="/landing/kucoin.png" alt="huobi" />
              <LogoMask></LogoMask>
            </LogoWrap>
            <ItemName>{t('toBeAnnounced')}</ItemName>
          </Item>
        </Grid>
      </Grid.Container>
    </ContentCard>
  )
}

export default CardWaysToSupport
