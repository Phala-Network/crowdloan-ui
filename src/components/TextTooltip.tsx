import { Tooltip } from '@geist-ui/react'
import { TooltipProps } from '@geist-ui/react/dist/tooltip/tooltip'
import React from 'react'
import styled from 'styled-components'
import AlertIcon from './AlertIcon'

const TooltipText = styled.div`
  margin: 6px 2px;
`

type Props = {
  text: React.ReactNode[]
} & Partial<TooltipProps>

const TextTooltip: React.FC<Props> = (props) => {
  const { text = [], ...others } = props

  return (
    <Tooltip
      text={
        <div>
          {text.map((node, index) => {
            return <TooltipText key={index}>{node}</TooltipText>
          })}
        </div>
      }
      type="dark"
      placement="bottomStart"
      hideArrow={true}
      offset={4}
      portalClassName="TooltipText"
      {...others}
    >
      <AlertIcon />
    </Tooltip>
  )
}

export default TextTooltip
