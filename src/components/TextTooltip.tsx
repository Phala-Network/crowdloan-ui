import { Button, Spacer, Tooltip, useBodyScroll } from '@geist-ui/react'
import { TooltipProps } from '@geist-ui/react/dist/tooltip/tooltip'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AlertIcon from '@/components/AlertIcon'
import Backdrop from '@/components/Backdrop'
import ReactDOM from 'react-dom'
import { useMediaQuery } from 'react-responsive'

const TooltipText = styled.div`
  margin: 6px 2px;
`

const MobileContent = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: left;
  background: #222222;
  border-radius: 8px 8px 0px 0px;
  padding: 16px;

  a {
    color: #03ffff;
  }
`

type Props = {
  text: React.ReactNode[]
} & Partial<TooltipProps>

const TextTooltip: React.FC<Props> = (props) => {
  const { text = [], onVisibleChange, ...others } = props
  const [visible, setVisible] = useState(false)
  const isXS = useMediaQuery({ minWidth: 640 })
  const [, setHidden] = useBodyScroll()

  useEffect(() => {
    setHidden(visible)
    onVisibleChange?.(visible)
  }, [visible])

  const content = (
    <div>
      {text.map((node, index) => (
        <TooltipText key={index}>{node}</TooltipText>
      ))}
    </div>
  )

  if (isXS) {
    return (
      <Tooltip
        onVisibleChange={onVisibleChange}
        text={content}
        type="dark"
        placement="bottomStart"
        hideArrow={true}
        offset={4}
        portalClassName="TooltipText"
      >
        <AlertIcon {...others} onClick={() => setVisible(true)} />
      </Tooltip>
    )
  } else {
    return (
      <>
        <AlertIcon {...others} onClick={() => setVisible(true)} />
        {ReactDOM.createPortal(
          <Backdrop onClick={() => setVisible(false)} visible={visible}>
            <MobileContent>
              {content}
              <Spacer y={1}></Spacer>
              <Button
                onClick={() => setVisible(false)}
                style={{ width: '100%' }}
                effect={false}
              >
                关闭
              </Button>
            </MobileContent>
          </Backdrop>,
          document.body
        )}
      </>
    )
  }
}

export default TextTooltip
