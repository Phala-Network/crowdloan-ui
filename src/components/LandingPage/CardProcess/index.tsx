import { Grid } from '@geist-ui/react'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { useI18n } from '@/i18n'
import ContentCard from '../ContentCard'
import { Arrow } from './Arrow'

const Item = styled.div`
  background-color: white;
  width: 100%;
  padding: 60px 20px;
  position: relative;
`

const ItemTitle = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 24px;
  color: #070707;
`

const ItemContent = styled.div`
  margin-top: 30px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: rgba(7, 7, 7, 0.75);
  mix-blend-mode: normal;
  opacity: 0.75;
`

const CardProcess: React.FC = () => {
  const positionBottom = useMediaQuery({ minWidth: 0, maxWidth: 640 })
  const notHideArrow = useMediaQuery({ minWidth: 640, maxWidth: 800 })
  const { t } = useI18n()

  return (
    <ContentCard type="vertical" name={[t('process')]} index={3}>
      <Grid.Container gap={3}>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>{t('processT1')}</ItemTitle>
            <ItemContent>{t('processC1')}</ItemContent>
            <Arrow position={positionBottom ? 'rightBottom' : ''}></Arrow>
          </Item>
        </Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>{t('processT2')}</ItemTitle>
            <ItemContent>{t('processC2')}</ItemContent>
            {!notHideArrow && <Arrow position={'rightBottom'}></Arrow>}
          </Item>
        </Grid>
        <Grid sm={0} md={8} xs={0}></Grid>
        <Grid sm={0} md={8} xs={0}></Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>{t('processT3')}</ItemTitle>
            <ItemContent>{t('processC3')}</ItemContent>
            <Arrow position={positionBottom ? 'rightBottom' : ''}></Arrow>
          </Item>
        </Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>{t('processT4')}</ItemTitle>
            <ItemContent>{t('processC4')}</ItemContent>
          </Item>
        </Grid>
      </Grid.Container>
    </ContentCard>
  )
}

export default CardProcess
