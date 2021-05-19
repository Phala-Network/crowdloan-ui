import { Tooltip } from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'

const TooltipText = styled.div`
  margin: 6px 2px;
`

const Icon = styled.div`
  display: inline-block;
  width: 14px;
  height: 14px;
  background-image: url('/alert.svg');
`

type Props = {
  text: string[]
}

const TextTooltip: React.FC<Props> = (props) => {
  const { text = [] } = props

  return (
    <Tooltip
      text={
        <div>
          {text.map((str) => {
            return <TooltipText key={str}>{str}</TooltipText>
          })}
        </div>
      }
      type="dark"
      placement="bottomStart"
      hideArrow={true}
      offset={4}
      portalClassName="TooltipText"
    >
      <Icon />
    </Tooltip>
  )
}

export default TextTooltip
