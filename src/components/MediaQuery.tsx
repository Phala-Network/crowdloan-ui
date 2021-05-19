import { Code, useMediaQuery } from '@geist-ui/react'
import React from 'react'

const MediaQuery: React.FC = () => {
  const isXS = useMediaQuery('xs')
  const isSM = useMediaQuery('sm')
  const isMD = useMediaQuery('md')
  const isLG = useMediaQuery('lg')
  const isXL = useMediaQuery('xl')

  return (
    <Code>
      {isXS && 'xs'}
      {isSM && 'sm'}
      {isMD && 'md'}
      {isLG && 'lg'}
      {isXL && 'xl'}
    </Code>
  )
}

export default MediaQuery
