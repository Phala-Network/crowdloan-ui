import React from 'react'
import { Grid } from '@geist-ui/react'
import styled, { FlattenSimpleInterpolation } from 'styled-components'
import { GridProps } from '@geist-ui/react/dist/grid/grid'

type SectionInnerOptions = {
  innerStyle?: FlattenSimpleInterpolation
}

export type SectionOptions = GridProps & SectionInnerOptions

const SectionWrapper = styled.div<SectionInnerOptions>`
  background: ${(props) => props.theme.bl01};
  color: ${(props) => props.theme.wh01};
  border-radius: 8px;
  width: 100%;
  display: flex;
  padding: 16px;
  ${(props) => props.innerStyle}
`

const Section: React.FC<React.PropsWithChildren<SectionOptions>> = ({
  children,
  innerStyle,
  ...props
}) => {
  return (
    <Grid {...props}>
      <SectionWrapper innerStyle={innerStyle}>{children}</SectionWrapper>
    </Grid>
  )
}

export default Section
