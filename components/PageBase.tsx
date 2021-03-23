import { Grid } from '@geist-ui/react'
import React from 'react'

interface PageBaseOptions {
  children: React.ReactNode
}

const PageBase: React.FC<PageBaseOptions> = ({ children }): JSX.Element => {
  return <Grid.Container gap={2} justify="center">
    {children}
  </Grid.Container>
}
export default PageBase
