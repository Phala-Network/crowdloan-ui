import React from 'react'
import Navbar from '@/components/Navbar'
import PageHeader from './PageHeader'
import styled, { createGlobalStyle } from 'styled-components'

const Page = styled.div`
  width: 100%;
  padding-top: 250px;
  padding-bottom: 200px;
  position: relative;
`

const Container = styled.div`
  max-width: 1350px;
  padding-right: 20px;
  padding-left: 20px;
  margin: auto;
`

const GlobalStyle = createGlobalStyle`
  ::selection {
    background: #03FFFF;
    color: #fff;
  }
`

const LandingPage: React.FC = () => {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Navbar color="#03FFFF" logo="/landing/logo.png" />
      <Page>
        <Container>
          <PageHeader
            title={'Khala’s Crowdloan Dapp is Comming！'}
            description={
              'Please bookmark this page, Khala will open Crowdloan on this page in the second round of the Kusama auction'
            }
          ></PageHeader>
        </Container>
      </Page>
    </>
  )
}

export default LandingPage
