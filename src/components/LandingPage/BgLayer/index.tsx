import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const BgLayerStyle = styled.div`
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-color: transparent;
  position: relative;

  .mask {
    position: absolute;
    background-color: black;
    opacity: 0.1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: opacity 0.1s linear;
  }
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
      <div className={'mask'}></div>

      {children}
    </BgLayerStyle>
  )
}

export default BgLayer
