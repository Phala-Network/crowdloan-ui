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
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: opacity 0.1s linear;
  }
`

type Props = {
  backgroundUrl: string
}

const BgLayer: React.FC<Props> = (props) => {
  const { children, backgroundUrl } = props
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const checkPosition = function () {
      const o = 1 - window.pageYOffset / 1000

      setOpacity(o < 0 ? 0 : o)
    }

    window.addEventListener('scroll', checkPosition)

    return () => {
      window.removeEventListener('scroll', checkPosition)
    }
  }, [])

  return (
    <BgLayerStyle
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
      className={'bgLayer'}
    >
      <div
        style={{
          opacity,
          backgroundImage: `linear-gradient(
            90deg,
            rgba(25, 25, 25, 0.8) 0%,
            rgba(25, 25, 25, 0.2) 100%
          )`,
        }}
        className={'mask'}
      ></div>
      {children}
    </BgLayerStyle>
  )
}

export default BgLayer
