import { Grid } from '@geist-ui/react'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
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

  return (
    <ContentCard type="vertical" name={['PROCESS']} index={3}>
      <Grid.Container gap={3}>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>Prep your KSM</ItemTitle>
            <ItemContent>
              Unbond your KSM soon if they’re already bonded! (At least 7 days
              before the Crowdloan starts).
            </ItemContent>
            <Arrow position={positionBottom ? 'rightBottom' : ''}></Arrow>
          </Item>
        </Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>the 2nd slot</ItemTitle>
            <ItemContent>
              Khala Network will join the Kusama slot auction when the second
              slot is released. when the 2nd slot begin, you can join on this
              page.
            </ItemContent>
            {!notHideArrow && <Arrow position={'rightBottom'}></Arrow>}
          </Item>
        </Grid>
        <Grid sm={0} md={8} xs={0}></Grid>
        <Grid sm={0} md={8} xs={0}></Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>Khala win auction</ItemTitle>
            <ItemContent>
              When Khala wins a slot and runs as parachain successfully, 34% of
              the <b>PHA</b> in the reward pool will be vested to contributors’
              addresses immediately. The remaining 66% will be vested monthly
              over 11 months.
            </ItemContent>
            <Arrow position={positionBottom ? 'rightBottom' : ''}></Arrow>
          </Item>
        </Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>Unlock KSM</ItemTitle>
            <ItemContent>
              If Khala wins, Crowdloaned <b>KSM</b> will be unlocked at the end
              of the lease period (48 weeks from the auction Khala wins).
            </ItemContent>
          </Item>
        </Grid>
      </Grid.Container>
    </ContentCard>
  )
}

export default CardProcess
