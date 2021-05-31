import React from 'react'
import styled from 'styled-components'

const BgLayerStyle = styled.div`
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-color: transparent;
  position: relative;
`

type Props = {
  backgroundUrl: string
  noMask?: boolean
}

const BgLayer: React.FC<Props> = (props) => {
  const { children, backgroundUrl } = props

  return (
    <BgLayerStyle
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
      className={'bgLayer'}
    >
      {children}
    </BgLayerStyle>
  )
}

export default BgLayer
