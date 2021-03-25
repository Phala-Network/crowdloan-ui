import { Grid } from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'

interface PageBaseOptions {
  children: React.ReactNode
}

const PageWrapper = styled.div`
  min-width: 100vw;
  min-height: calc(100vh - 120px);
  padding: 92px 0 42px;
  margin: 0;
`
const GridWrapper = styled.div`
  margin: 0 120px;
  max-width: 1400px;
  @media (min-width: 0px) and (max-width: 540px) {
    margin: 0 12px;
  }
  @media (min-width: 540px) and (max-width: 960px) {
    margin: 0 40px;
  }
  @media (min-width: 960px) and (max-width: 1280px) {
    margin: 0 80px;
  }
`

const PageBase: React.FC<PageBaseOptions> = ({ children }): JSX.Element => {
  return (
    <PageWrapper>
      <GridWrapper>
        <Grid.Container gap={1} wrap="wrap" justify="center">
          {children}
        </Grid.Container>
      </GridWrapper>
    </PageWrapper>
  )
}
export default PageBase
