import { useClickAway } from '@geist-ui/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import PageHeaderButton from '../PageHeaderButton'

const Qrcode = styled.div<{
  color: string
}>`
  position: absolute;
  bottom: -210px;
  left: -2px;
  border: 2px solid ${(props) => props.color};
  z-index: 2000;
  width: 200px;
  height: 200px;

  > div {
    width: 100%;
    height: 100%;
    display: block;
    border: 3px solid;
  }

  img {
    width: 100%;
  }
`

type Props = {
  color: string
}

const WechatButton: React.FC<Props> = (props) => {
  const { color } = props
  const [showQrcode, setShowQrcode] = useState(false)
  const ref = React.useRef<HTMLDivElement>()
  useClickAway(ref, () => setShowQrcode(false))

  return (
    <span ref={ref}>
      <PageHeaderButton
        style={{ position: 'relative' }}
        color="gray"
        hasArrowIcon
        size="middle"
        onClick={() => setShowQrcode(true)}
      >
        微信
        <Qrcode
          style={{ display: showQrcode ? 'block' : 'none' }}
          color={color}
        >
          <img src="https://phala.network/images/qrcode.png" alt="qrcode" />
        </Qrcode>
      </PageHeaderButton>
    </span>
  )
}

export default WechatButton
