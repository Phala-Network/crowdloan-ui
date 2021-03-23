import PageBase from '@/components/PageBase'
import Section from '@/utils/Section'
import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 12px;
`

const Home: NextPage = () => {
  return <PageBase>
    <Section>
      {123}
      <Title>My page</Title>
    </Section>
    <Section>
      {123}
      <Title>My page</Title>
    </Section>
    <Section>
      {123}
      <Title>My page</Title>
    </Section>
    <Section>
      {123}
      <Title>My page</Title>
    </Section>
    <Section>
      {123}
      <Title>My page</Title>
    </Section>
  </PageBase>
}

export default Home
