import { Grid } from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import ContentCard from './ContentCard'

const Item = styled.div`
  background-color: white;
  width: 100%;
  padding: 60px 20px;
`

const ItemTitle = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
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
  color: rgba(6, 6, 6, 0.75);
  mix-blend-mode: normal;
  opacity: 0.75;
`

const CardQA: React.FC = () => {
  return (
    <ContentCard type="vertical" name={['Q&A']} index={5}>
      <Grid.Container gap={3}>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>Q1</ItemTitle>
            <ItemContent>
              A: Phala is a Polkadot parachain, and developers can invoke and
              interact with confidential contracts on other Polkadot parachains
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>Q2</ItemTitle>
            <ItemContent>
              A: Phala is a Polkadot parachain, and developers can invoke and
              interact with confidential contracts on other Polkadot parachains
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>Q3</ItemTitle>
            <ItemContent>
              A: Phala is a Polkadot parachain, and developers can invoke and
              interact with confidential contracts on other Polkadot parachains
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>Q4</ItemTitle>
            <ItemContent>
              A: Phala is a Polkadot parachain, and developers can invoke and
              interact with confidential contracts on other Polkadot parachains
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={12} md={8} xs={24}>
          <Item>
            <ItemTitle>Q5</ItemTitle>
            <ItemContent>
              A: Phala is a Polkadot parachain, and developers can invoke and
              interact with confidential contracts on other Polkadot parachains
            </ItemContent>
          </Item>
        </Grid>
      </Grid.Container>
    </ContentCard>
  )
}

export default CardQA
