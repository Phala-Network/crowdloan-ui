import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

const Home: NextPage = () => {
  return <Title>My page</Title>
}

export default Home
