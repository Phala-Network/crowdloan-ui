import React from 'react'
import { Grid } from '@geist-ui/react'
import styled from 'styled-components'

interface SectionOptions {
  children: React.ReactNode
}

const SectionWrapper = styled.div`
  background: ${props => props.theme.bl01};
  border-radius: 8px;
  width: 100%;
  display: flex;
`

const Section: React.FC<SectionOptions> = ({
  children
}) => {
  return <Grid>
    <SectionWrapper>
      {children}
    </SectionWrapper>
  </Grid>
}

export default Section
